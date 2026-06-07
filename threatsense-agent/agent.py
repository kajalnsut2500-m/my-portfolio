
from langchain_groq import ChatGroq
from langgraph.prebuilt import create_react_agent
from langchain.tools import tool
from dotenv import load_dotenv
import os

load_dotenv()

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY")
)

@tool
def analyze_threat(input: str) -> str:
    """Analyzes if a given URL, IP, or text is a security threat."""
    return f"Analyzing: {input} — looks suspicious based on pattern."

tools = [analyze_threat]


agent = create_react_agent(llm, tools)


result = agent.invoke({
    "messages": [{"role": "user", "content": "Is the URL http://free-money-click-here.ru safe?"}]
})

print(result["messages"][-1].content)
