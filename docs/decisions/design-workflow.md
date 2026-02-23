# Design Workflow Decision

*Date: 2026-02-23*

## Approach: Multi-Model Design Council

### ChatGPT / GPT-5.x (via `codex` CLI)
- **CLI**: `codex exec -m gpt-5.1 "prompt"` or `codex exec -m o3 "prompt"`
- **Role**: Frontend designer — generates UI concepts, component designs, layout ideas
- **Strength**: Strong visual design intuition, creative concepts

### Claude Opus (via `claude` CLI)  
- **CLI**: `claude --model opus --print "prompt"`
- **Role**: Architecture, design critique, production implementation
- **Strength**: Deep technical reasoning, anti-AI-slop aesthetics (via frontend-design-ultimate skill)

### Gemini 3.1 Pro (via AI Studio browser — not yet in CLI)
- **Access**: Browser → AI Studio (aistudio.google.com) or Gemini app
- **Role**: Frontend designer, deep research, alternative perspectives
- **Note**: CLI only has gemini-2.5-pro (`gemini -m gemini-2.5-pro "prompt"`). Use browser for 3.1.

### Workflow
1. **Brief all models** with the same design task
2. **Compare outputs** — pick the best ideas from each
3. **Fred synthesizes** through frontend-design-ultimate lens — kill anything generic, push for distinctiveness
4. **Iterate** with the strongest model for that specific task
5. **Integrate** into the Phaser + Next.js architecture

### CLI Quick Reference
```bash
# ChatGPT (via Codex)
codex exec -m gpt-5.1 "Design a FreeCell game board..."

# Claude Opus
claude --model opus --print "Review this design..."

# Gemini 2.5 Pro (CLI fallback)
gemini -m gemini-2.5-pro "Design the TopBar component..."

# Gemini 3.1 Pro → use browser (AI Studio)
```
