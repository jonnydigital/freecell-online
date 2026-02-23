# Design Workflow Decision

*Date: 2026-02-23*

## Approach: Gemini 3.1 Pro + Claude Frontend Design Skill

### Gemini 3.1 Pro (via AI Studio / CLI)
- **Role**: Primary frontend designer — generates UI concepts, component designs, layout ideas
- **Strength**: Bold, distinctive visual design; strong with React + Tailwind + shadcn/ui
- **Use for**: Initial mockups, component styling, animation concepts, responsive layouts, visual polish

### Claude (frontend-design-ultimate skill)
- **Role**: Design critic, refinement, and production implementation
- **Strength**: Anti-AI-slop aesthetics, mobile-first responsive patterns, production-grade code
- **Use for**: Reviewing Gemini's output, catching generic/cookie-cutter patterns, ensuring distinctiveness, bundling for production

### Workflow
1. **Brief Gemini** with specific design task (e.g., "Design the game board layout for desktop and mobile")
2. **Gemini generates** concepts with code
3. **Claude reviews** through frontend-design-ultimate lens — critiques, refines, ensures it doesn't look like every other AI-generated site
4. **Iterate** until the design is distinctive, performant, and production-ready
5. **Integrate** into the Phaser + Next.js architecture

### Why Both?
- Gemini excels at creative generation — more divergent, surprising ideas
- Claude excels at critical evaluation — catches sameness, ensures quality
- Together they produce designs that are both creative AND polished
