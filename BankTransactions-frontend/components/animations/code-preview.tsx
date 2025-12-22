"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Check, Loader2, Play } from "lucide-react"

const solidityCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FinChainToken {
    string public name = "FinChain";
    string public symbol = "FNC";
    uint8 public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) 
        public balanceOf;
    
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );
    
    constructor(uint256 _supply) {
        totalSupply = _supply;
        balanceOf[msg.sender] = _supply;
    }
    
    function transfer(
        address _to, 
        uint256 _amount
    ) external returns (bool) {
        require(
            balanceOf[msg.sender] >= _amount
        );
        balanceOf[msg.sender] -= _amount;
        balanceOf[_to] += _amount;
        emit Transfer(
            msg.sender, _to, _amount
        );
        return true;
    }
}`

export function CodePreview() {
  const [displayedCode, setDisplayedCode] = useState("")
  const [status, setStatus] = useState<"typing" | "compiling" | "deploying" | "deployed">("typing")
  const [currentLine, setCurrentLine] = useState(0)

  useEffect(() => {
    const lines = solidityCode.split("\n")
    let lineIndex = 0
    let charIndex = 0
    let currentText = ""

    const typeInterval = setInterval(() => {
      if (lineIndex < lines.length) {
        const line = lines[lineIndex]
        if (charIndex <= line.length) {
          currentText = lines.slice(0, lineIndex).join("\n") + (lineIndex > 0 ? "\n" : "") + line.slice(0, charIndex)
          setDisplayedCode(currentText)
          setCurrentLine(lineIndex)
          charIndex++
        } else {
          lineIndex++
          charIndex = 0
        }
      } else {
        clearInterval(typeInterval)
        setStatus("compiling")

        setTimeout(() => {
          setStatus("deploying")
          setTimeout(() => {
            setStatus("deployed")
          }, 2000)
        }, 1500)
      }
    }, 20)

    return () => clearInterval(typeInterval)
  }, [])

  const getStatusIcon = () => {
    switch (status) {
      case "typing":
        return <Play className="h-3 w-3" />
      case "compiling":
      case "deploying":
        return <Loader2 className="h-3 w-3 animate-spin" />
      case "deployed":
        return <Check className="h-3 w-3" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case "typing":
        return "Writing contract..."
      case "compiling":
        return "Compiling..."
      case "deploying":
        return "Deploying to Ethereum..."
      case "deployed":
        return "Deployed successfully!"
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "typing":
        return "text-muted-foreground"
      case "compiling":
        return "text-yellow-500"
      case "deploying":
        return "text-primary"
      case "deployed":
        return "text-green-500"
    }
  }

  return (
    <motion.div
      className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/30 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="h-3 w-3 rounded-full bg-yellow-500" />
            <span className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs text-muted-foreground">FinChainToken.sol</span>
        </div>
        <div className={`flex items-center gap-1.5 text-xs ${getStatusColor()}`}>
          {getStatusIcon()}
          {getStatusText()}
        </div>
      </div>

      {/* Code */}
      <div className="relative max-h-[300px] overflow-auto p-4 font-mono text-xs">
        <pre className="text-muted-foreground">
          {displayedCode.split("\n").map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 inline-block w-6 text-right text-muted-foreground/50">{i + 1}</span>
              <code
                className={`${i === currentLine && status === "typing" ? "border-r-2 border-primary" : ""}`}
                dangerouslySetInnerHTML={{
                  __html: highlightSolidity(line),
                }}
              />
            </div>
          ))}
        </pre>
      </div>

      {/* Deployed address */}
      {status === "deployed" && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-border bg-green-500/10 px-4 py-3"
        >
          <div className="text-xs text-green-500">
            Contract deployed at: <span className="font-mono">0x7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

function highlightSolidity(code: string): string {
  return code
    .replace(
      /(pragma|solidity|contract|string|public|uint8|uint256|mapping|address|event|indexed|constructor|function|external|returns|bool|require|emit|return)/g,
      '<span class="text-purple-400">$1</span>',
    )
    .replace(/(".*?")/g, '<span class="text-green-400">$1</span>')
    .replace(/(\/\/.*)/g, '<span class="text-muted-foreground/50">$1</span>')
    .replace(/(\d+)/g, '<span class="text-cyan-400">$1</span>')
}
