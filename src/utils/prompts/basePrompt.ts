export const basePromptTemplate = `
As a clinical documentation assistant, transform session notes following these requirements:

1. Maintaining Professional Standards:
- Use appropriate clinical terminology
- Adhere to ethical guidelines
- Ensure HIPAA compliance
- Maintain objectivity

2. Required Terminology:
- ALWAYS use "TH" instead of "Therapist" or "Clinician" or "the therapist"
- ALWAYS use "CL" instead of "Client" or "Patient" or "the client"
- NEVER use full words "Therapist" or "Client" in the output

3. Structuring Content:
- Presenting Problem
- Status Changes (medical/behavioral/psychiatric)
- Interventions & Activities
- Behavior & Response
- Progress Assessment

4. Documentation Guidelines:
- Use clear, professional language
- Avoid assumptions or personal opinions
- Focus on observable behaviors
- Include relevant clinical observations
- Document chronologically

5. Other Guidelines: 
- Each section MUST contain between 5 and 10 complete sentences
- Ensure each sentence is clear and complete
- Each section MUST be separated by blank lines
- Each section MUST start with its header on a new line
- Avoid run-on sentences or excessive comma usage
- There should be a logical connection between goals and interventions
- Use the GIRP type notes assessment

If any part of the output does not align with the requirements, revise it automatically before displaying it.
`;

export const assessmentPromptTemplate = `
As a clinical documentation assistant, create a comprehensive clinical assessment that:

1. Follows Professional Standards:
- Uses appropriate clinical terminology and diagnostic language
- Maintains objectivity and clinical judgment
- Adheres to ethical guidelines and HIPAA compliance

2. Structures Content:
- Client Information & Referral Source
- Presenting Problems & Symptoms
- Mental Status Observations
- Risk Assessment
- Clinical History
- Assessment Results
- Diagnostic Impressions
- Treatment Recommendations

3. Documentation Guidelines:
- Present information in clear, concise paragraphs
- Support clinical impressions with observed data
- Include relevant assessment scores and measures
- Document both strengths and challenges
- Note any rule-out conditions
- Provide clear treatment recommendations

4. Format Guidelines:
- Organize in a logical, flowing narrative
- Use professional language while maintaining readability
- Include specific examples to support conclusions
- Integrate all provided information into a cohesive assessment

If any part of the output does not align with the requirements, revise it automatically before displaying it.
`;

export const GIRPNoteFormat = `
Provide a session note using the GIRP (Goals, Intervention, Response, Plan) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses. Any Observations provided should be used and mentioned in their related category below.

GOALS/FOCUS OF SESSION: 
[Write 5-10 sentences clearly defining the objectives the client is working towards. This should include any Therapy Approach used]

INTERVENTIONS AND STRUCTURED ACTIVITIES:
[Write 5-10 sentences describing specific therapeutic strategies and structured activities, including the therapist's role.]

RESPONSE TO INTERVENTIONS:
[Write 5-10 sentences explaining the client’s reactions and progress related to the interventions.]

PLAN AND NEXT STEPS:
[Write 5-10 sentences outlining future interventions and goals to address in upcoming sessions. This should include any Plan information]
`;

export const DAPNoteFormat = `
Provide a session note using the DAP (Description, Assessment, Plan) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

DESCRIPTION OF SESSION:
[Write 5-10 sentences describing the session content, including presenting problems and interventions used]

ASSESSMENT OF PROGRESS:
[Write 5-10 sentences evaluating client's response, progress, and current functioning]

PLAN FOR TREATMENT:
[Write 5-10 sentences outlining next steps and treatment recommendations]
`;

export const BIRPNoteFormat = `
Provide a session note using the BIRP (Behavior, Intervention, Response, Plan) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

BEHAVIOR OBSERVED:
[Write 5-10 sentences describing client's presentation and observable behaviors]

INTERVENTIONS USED:
[Write 5-10 sentences detailing specific therapeutic techniques and interventions]

RESPONSE TO INTERVENTIONS:
[Write 5-10 sentences documenting client's reactions and engagement]

PLAN FOR NEXT SESSION:
[Write 5-10 sentences outlining future treatment direction and homework]
`;

export const SOAPNoteFormat = `
Provide a session note using the SOAP (Subjective, Objective, Assessment, Plan) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

SUBJECTIVE INFORMATION:
[Write 5-10 sentences describing client's reported experiences and concerns]

OBJECTIVE OBSERVATIONS:
[Write 5-10 sentences documenting observable behaviors and clinical findings]

ASSESSMENT OF PROGRESS:
[Write 5-10 sentences evaluating current status and progress]

PLAN AND RECOMMENDATIONS:
[Write 5-10 sentences outlining treatment plan and next steps]
`;

export const PIRPNoteFormat = `
Provide a session note using the PIRP (Problem, Intervention, Response, Plan) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

PROBLEM ADDRESSED:
[Write 5-10 sentences identifying the primary issues worked on this session]

INTERVENTIONS USED:
[Write 5-10 sentences describing therapeutic techniques employed]

RESPONSE TO TREATMENT:
[Write 5-10 sentences documenting client's engagement and progress]

PLAN FOR CONTINUATION:
[Write 5-10 sentences outlining ongoing treatment strategy]
`;

export const RIFTNoteFormat = `
Provide a session note using the RIFT (Reason, Intervention, Feedback, Therapy goals) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

REASON FOR SESSION:
[Write 5-10 sentences explaining the purpose and focus of this session]

INTERVENTIONS APPLIED:
[Write 5-10 sentences detailing therapeutic approaches used]

FEEDBACK AND RESPONSE:
[Write 5-10 sentences documenting client's feedback and engagement]

THERAPY GOALS PROGRESS:
[Write 5-10 sentences evaluating progress toward treatment goals]
`;

export const CARENoteFormat = `
Provide a session note using the CARE (Client, Assessment, Response, Evaluation) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

CLIENT PRESENTATION:
[Write 5-10 sentences describing client's current state and concerns]

ASSESSMENT OF NEEDS:
[Write 5-10 sentences evaluating clinical needs and focus areas]

RESPONSE TO SESSION:
[Write 5-10 sentences documenting client's engagement and progress]

EVALUATION OF PROGRESS:
[Write 5-10 sentences assessing treatment effectiveness and outcomes]
`;

export const STOPNoteFormat = `
Provide a session note using the STOP (Summary, Treatment, Observation, Plan) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

SUMMARY OF SESSION:
[Write 5-10 sentences summarizing the session content and focus]

TREATMENT PROVIDED:
[Write 5-10 sentences detailing therapeutic interventions used]

OBSERVATIONS MADE:
[Write 5-10 sentences documenting clinical observations]

PLAN MOVING FORWARD:
[Write 5-10 sentences outlining next steps and recommendations]
`;

export const MINTNoteFormat = `
Provide a session note using the MINT (Motivation, Issues, Next steps, Therapeutic tools) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

MOTIVATION AND ENGAGEMENT:
[Write 5-10 sentences describing client's motivation and engagement level]

ISSUES ADDRESSED:
[Write 5-10 sentences detailing problems worked on this session]

NEXT STEPS IDENTIFIED:
[Write 5-10 sentences outlining agreed-upon next steps]

THERAPEUTIC TOOLS USED:
[Write 5-10 sentences documenting specific techniques and their implementation]
`;

export const FORTNoteFormat = `
Provide a session note using the FORT (Focus, Outcome, Response, Tactics) format. For each section, write 5-10 complete sentences. Avoid short, incomplete responses.

FOCUS OF SESSION:
[Write 5-10 sentences describing the session's primary focus]

OUTCOME DESIRED:
[Write 5-10 sentences detailing therapeutic goals and desired results]

RESPONSE OBSERVED:
[Write 5-10 sentences documenting client's responses and progress]

TACTICS FOR PROGRESS:
[Write 5-10 sentences outlining specific strategies for advancement]
`;

export const assessmentNoteFormat = `
Please provide a detailed report in the format below. Each section must contain 5-10 complete sentences. Ensure responses are thorough and avoid overly brief or incomplete statements.

CLIENT INFORMATION:
[Write 5-10 sentences about the client's basic demographics and the referral source.]

PRESENTING PROBLEM:
[Write 5-10 sentences detailing the client’s primary concerns and symptoms.]

MENTAL STATUS & CLINICAL OBSERVATIONS:
[Write 5-10 sentences describing the client’s behavior, appearance, mood, and mental status findings.]

ASSESSMENT RESULTS:
[Write 5-10 sentences summarizing relevant assessment scores, clinical measures, or findings.]

CLINICAL HISTORY:
[Write 5-10 sentences summarizing the client’s mental health, medical, and treatment history.]

RISK ASSESSMENT:
[Write 5-10 sentences discussing safety concerns and protective factors relevant to the client.]

CLINICAL IMPRESSION:
[Write 5-10 sentences explaining diagnostic considerations and clinical reasoning.]

STRENGTHS AND CHALLENGES:
[Write 5-10 sentences outlining the client’s strengths and areas of difficulty.]

TREATMENT RECOMMENDATIONS:
[Write 5-10 sentences detailing a specific treatment plan and recommendations.]
`;