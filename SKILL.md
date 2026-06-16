# SKILL: Extract & Create Conversation-based Skills

Related: `agent-customization`

Purpose
- Capture a reproducible workflow for converting a multi-step conversation into a reusable SKILL.md file.

When to use
- You or an agent followed a repeatable multi-step methodology in a conversation and want a saved, shareable skill to reproduce it.

Inputs required
- Full conversation transcript or link to the conversation context.
- Desired outcome: "quick checklist" or "full multi-step workflow".
- Scope: workspace-scoped (files + repo context) or personal (user-specific preferences).

Outputs produced
- A SKILL.md file that documents the step-by-step process, decision points, completion criteria, example prompts, and iteration/questions for refinement.

Primary steps
1. Extract
   - Read the conversation and identify the concrete sequence of actions the agent followed.
   - List decision points (branches, conditional checks) and their triggers.
   - Note explicit quality criteria or completion checks mentioned.
2. Clarify
   - If the conversation lacks clear outcomes, ask the user: desired output, scope, and level of detail.
   - Choose between a compact checklist or a detailed, multi-step playbook.
3. Draft
   - Create a SKILL.md including: Purpose, When to use, Inputs, Outputs, Step-by-step procedure, Decision branching, Quality checks, Example prompts, and Iteration notes.
4. Iterate
   - Save draft to the workspace.
   - Ask targeted clarifying questions about ambiguous steps.
   - Update until all decision points and success criteria are concrete.

Decision branching template
- For each step, include: trigger condition, expected input, action, and follow-up step.

Quality checks / completion criteria
- Define 2–4 observable checks (files created/modified, tests passing, explicit approvals).

Example prompts to use this skill
- "Extract the deployment checklist from our conversation and save as a SKILL.md (workspace-scoped)."
- "Convert the debugging run we did into a repeatable playbook with decision points."

Suggested file placement
- Put the SKILL.md at the repo root or in a `.vscode/skills/` folder for discoverability.

Iteration questions to ask the user after the draft
- Should this be workspace-scoped or personal?
- Which steps are optional vs required?
- Any additional examples or edge-cases to include?

Tips for maintainers
- Keep steps atomic and deterministic.
- Use concrete file paths, commands, and expected outputs when possible.
- Add example prompts and quick checks to make the skill runnable by other agents.

---

Next actions I can take
- Tailor this draft to your repo (I can add repo-specific examples).
- Move the file to `.vscode/skills/` if you prefer.
- Ask the clarifying questions listed above and iterate.
