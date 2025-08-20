# The first of the 3 ways that guide devops is Flow (left to right)

Improve throughput. Or lead time. Basically reduce time it takes to for a change to go from dev to production.

## Important things

- Make work visible
- Limit WIP
- Reduce batch size
- Reduce the number of handoffs (reduce work waiting in queues)
  - This can be done by automating significant portions of the work or reorganizing teams so they can deliver value to the customer themselves.
- Continually identify and elevate our constraints (improve work capacity)
  - Typical DevOps transformations encounter constraints in the following order:
    - On demand Environment Creation
    - Automated Code deployment
    - Automated Test setup and execution
    - Modular architecture and more automony to make changes
- Eliminate hardships and waste in the value stream
  - Partially done work
  - Extra processes (that don't add value to the customer)
  - Extra features
  - Task switching
  - Waiting
  - Motion (handoffs but also the difficulty of handoff too)
  - Defects
  - Non standard or manual work
  - Heroics

# The second way is to do with Feedback (right to left)

In technology we deal with complex systems, one person cannot understand how it all fits together, and failure is inherent and inevitable in complex systems.
Systems must therefore be designed that will detect errors quickly.
4 conditions can make it safer to work in complex systems:

- See problems as they occur (feedback loops)
- Swarm and solve problems to build new knowledge (Andon cord)
- Keep pushing quality closer to the source
- Enable optimizing for downstream work centers

# The third way is to do with Continual Learning and Experimentation
