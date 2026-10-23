/**
 * RoadTo600: TOEFL ITP & Fluency Mastery
 * Official Conversion Tables, Seed Database, Listening/Fluency Studio & 15-Question Simulasi Data
 */

// Official TOEFL ITP Level 1 Raw-to-Scaled Score Conversion Tables
// Section 1: Listening Comprehension (Raw 0-50 -> Scaled 31-68)
const LISTENING_RAW_TO_SCALED = [
  31, 31, 31, 31, 31, 31, 32, 32, 33, 34,
  35, 35, 36, 37, 38, 39, 40, 41, 41, 42,
  43, 44, 45, 45, 46, 47, 48, 48, 49, 50,
  51, 51, 52, 52, 53, 54, 54, 55, 56, 57,
  57, 58, 58, 59, 60, 61, 62, 63, 65, 66,
  68
];

// Section 2: Structure & Written Expression (Raw 0-40 -> Scaled 31-68)
const STRUCTURE_RAW_TO_SCALED = [
  31, 31, 31, 31, 31, 32, 33, 34, 35, 36,
  37, 38, 39, 40, 40, 41, 42, 43, 43, 44,
  45, 46, 47, 48, 48, 49, 50, 51, 52, 53,
  54, 55, 56, 57, 58, 60, 61, 63, 65, 67,
  68
];

// Section 3: Reading Comprehension (Raw 0-50 -> Scaled 31-67)
const READING_RAW_TO_SCALED = [
  31, 31, 31, 31, 31, 31, 32, 32, 33, 34,
  35, 36, 37, 38, 39, 40, 41, 41, 42, 43,
  43, 44, 45, 46, 46, 47, 47, 48, 48, 49,
  49, 50, 50, 51, 52, 52, 53, 54, 55, 56,
  57, 58, 58, 59, 60, 61, 63, 64, 65, 66,
  67
];

const SCORE_PRESETS = [
  {
    id: 'baseline-497',
    label: 'Baseline (497)',
    badge: 'B1 Intermediate',
    rawL: 29,
    rawS: 25,
    rawR: 32,
    description: 'Your starting benchmark: solid foundation with room to eliminate Structure traps.'
  },
  {
    id: 'milestone-550',
    label: 'Mid-Goal (550)',
    badge: 'B2 Upper-Int',
    rawL: 37,
    rawS: 31,
    rawR: 38,
    description: 'Standard scholarship minimum. Achievable by mastering the top 25 Structure skills.'
  },
  {
    id: 'target-600-balanced',
    label: 'Target 600 (Balanced)',
    badge: 'C1 Advanced',
    rawL: 43,
    rawS: 36,
    rawR: 44,
    description: 'Classic 600 Blueprint: L: 43/50 [59] • S: 36/40 [61] • R: 44/50 [60] => 600.'
  },
  {
    id: 'target-600-grammar',
    label: '600 Grammar Carry',
    badge: 'C1 Strategic',
    rawL: 40,
    rawS: 38,
    rawR: 41,
    description: 'Uses near-perfect Structure (38/40) to cushion Listening & Reading margin.'
  }
];

const DAILY_HABITS_CONFIG = [
  {
    id: 'habit_structure',
    title: 'Structure 60-Skills Drill (15 mins)',
    subtitle: 'Master inversions, reduced clauses, parallel structure & error ID traps.',
    minutes: 15,
    category: 'Section 2 • Grammar',
    targetTab: 'drills',
    targetSubtab: 'structure',
    xp: 50
  },
  {
    id: 'habit_reading',
    title: 'Academic Reading + 5 AWL Vocab (15 mins)',
    subtitle: 'Timed academic passage with numbered lines + Tap-to-Save AWL vocabulary.',
    minutes: 15,
    category: 'Section 3 • Reading & Lexicon',
    targetTab: 'drills',
    targetSubtab: 'reading',
    xp: 50
  },
  {
    id: 'habit_fluency',
    title: 'Shadowing & Listening Fluency (15 mins)',
    subtitle: 'Active academic audio shadowing to boost listening speed & spoken prosody.',
    minutes: 15,
    category: 'Section 1 + Spoken Fluency',
    targetTab: 'fluency',
    targetSubtab: 'shadowing',
    xp: 50
  }
];

/**
 * SEED DATABASE (PRE-LOADED EXACT JSON DATA + LONGMAN 60-SKILLS LAB)
 */
const SEED_STRUCTURE_QUESTIONS = [
  {
    "id": "str-1",
    "section": "Structure Part A",
    "skill": "Skill 15: Inversion with Negative Expressions",
    "question": "Rarely _______ located near city lights or at lower elevations.",
    "options": ["observatories are", "are", "in the observatories", "are observatories"],
    "correctIndex": 3,
    "explanation": "Negative expressions (Rarely, Seldom, Never, Only in) placed at the beginning of a sentence require Subject-Verb Inversion. The helping verb 'are' must come before the plural subject 'observatories'.",
    "structuralAnalysis": {
      "mainSubject": "observatories (plural noun)",
      "mainVerb": "are located (passive verb phrase, split by inversion: [Auxiliary 'are'] + [Subject 'observatories'] + [Past Participle 'located'])",
      "optionBreakdown": [
        "A ('observatories are'): Incorrect — keeps normal S+V word order instead of inverting after fronted negative 'Rarely'.",
        "B ('are'): Incorrect — omits the main subject of the sentence entirely.",
        "C ('in the observatories'): Incorrect — turns 'observatories' into a prepositional object, leaving the verb without a subject.",
        "D ('are observatories'): Correct — properly inverts auxiliary 'are' before plural subject 'observatories'."
      ]
    }
  },
  {
    "id": "str-2",
    "section": "Structure Part B (Error Recognition)",
    "skill": "Skill 25: Parallel Structure with Comparisons",
    "question": "The [A] climate of Indonesia is [B] much more humid than [C] the Gobi Desert [D] in winter.",
    "options": ["[A] climate", "[B] much more", "[C] the Gobi Desert", "[D] in winter"],
    "correctIndex": 2,
    "explanation": "Logical Comparison Error: You cannot compare 'the climate' of Indonesia directly to 'the Gobi Desert' (a place). It must be 'that of the Gobi Desert' (using singular pronoun 'that' to replace 'the climate').",
    "structuralAnalysis": {
      "mainSubject": "The climate (singular head noun modified by 'of Indonesia')",
      "mainVerb": "is (linking verb connecting subject to comparative adjective 'much more humid')",
      "optionBreakdown": [
        "[A] climate: Correct singular head noun serving as the entity being compared.",
        "[B] much more: Correct comparative intensifier ('much') + comparative marker ('more') before 'humid'.",
        "[C] the Gobi Desert: Incorrect (Illogical Comparison) — compares a climate to a desert. Must be 'that of the Gobi Desert'.",
        "[D] in winter: Correct prepositional time phrase."
      ]
    }
  },
  {
    "id": "str-3",
    "section": "Structure Part A",
    "skill": "Skill 13: Reduced Adjective Clauses",
    "question": "The macroeconomic data _______ in the annual national accounts report indicated a steady rise in gross fixed capital formation.",
    "options": ["presenting", "presented", "was presented", "which presenting"],
    "correctIndex": 1,
    "explanation": "The main clause already has a subject ('The macroeconomic data') and a main verb ('indicated'). Therefore, the blank requires a reduced passive adjective clause ('which was presented' -> 'presented'), not a full verb ('was presented').",
    "structuralAnalysis": {
      "mainSubject": "The macroeconomic data",
      "mainVerb": "indicated (past tense transitive finite verb)",
      "optionBreakdown": [
        "A ('presenting'): Incorrect — active participle implies the data actively presented something, rather than being presented.",
        "B ('presented'): Correct — reduced passive adjective clause ('[which was] presented in the annual... report').",
        "C ('was presented'): Incorrect — creates a double-verb error alongside the main verb 'indicated' without a connector.",
        "D ('which presenting'): Incorrect — a relative pronoun ('which') cannot be followed directly by a participle without an auxiliary verb."
      ]
    }
  },
  {
    "id": "str-4",
    "section": "Structure Part B (Error Recognition)",
    "skill": "Skill 20: Subject-Verb Agreement after Prepositional Phrases",
    "question": "The [A] comprehensive evaluation of fixed asset registers across multiple regional branches [B] have revealed [C] significant discrepancies in [D] depreciation rates.",
    "options": ["[A] comprehensive", "[B] have revealed", "[C] significant", "[D] depreciation rates"],
    "correctIndex": 1,
    "explanation": "The main subject is singular ('The comprehensive evaluation'), not 'branches' (which is inside a prepositional phrase). Therefore, the verb must be singular: 'has revealed', not 'have revealed'.",
    "structuralAnalysis": {
      "mainSubject": "The comprehensive evaluation (singular head noun; ignore 'of fixed asset registers across multiple regional branches')",
      "mainVerb": "has revealed (erroneously written as plural 'have revealed')",
      "optionBreakdown": [
        "[A] comprehensive: Correct adjective modifying the singular noun 'evaluation'.",
        "[B] have revealed: Incorrect Subject-Verb Agreement — plural auxiliary 'have' clashes with singular subject 'evaluation'; must be 'has revealed'.",
        "[C] significant: Correct adjective modifying the plural noun 'discrepancies'.",
        "[D] depreciation rates: Correct compound noun object of the preposition 'in'."
      ]
    }
  },
  {
    "id": "str-5",
    "section": "Structure Part B (Error Recognition)",
    "skill": "Skill 24: Parallel Structure with Paired Conjunctions",
    "question": "Microfluidic diagnostic chips are prized [A] not only for their [B] rapid assay speed [C] but also because they [D] consume minimal reagent volume.",
    "options": ["[A] not only", "[B] rapid", "[C] but also because they", "[D] consume minimal"],
    "correctIndex": 2,
    "explanation": "Paired conjunctions ('not only ... but also') must join grammatically parallel structures. Since 'not only' is followed by a prepositional phrase ('for their rapid assay speed'), 'but also' must also be followed by a prepositional phrase ('for their minimal reagent consumption'), not an adverb clause ('because they...').",
    "structuralAnalysis": {
      "mainSubject": "Microfluidic diagnostic chips (plural noun phrase)",
      "mainVerb": "are prized (passive main verb)",
      "optionBreakdown": [
        "[A] not only: Correct first half of the correlative conjunction pair.",
        "[B] rapid: Correct adjective modifying 'assay speed'.",
        "[C] but also because they: Incorrect Parallelism — pairs prepositional phrase ('for + NP') with clause ('because + S + V').",
        "[D] consume minimal: Grammatically valid inside its clause, though the clause connector itself violates parallelism."
      ]
    }
  },
  {
    "id": "str-6",
    "section": "Structure Part A",
    "skill": "Skill 18: Conditional Inversion (Omitting 'If')",
    "question": "_______ the central bank to tighten reserve requirements abruptly, interbank overnight lending rates would spike.",
    "options": ["If were", "Were", "Should", "Had been"],
    "correctIndex": 1,
    "explanation": "In an unreal present/future conditional containing 'were to + base verb' ('If the central bank were to tighten...'), 'if' can be omitted by inverting 'Were' in front of the subject.",
    "structuralAnalysis": {
      "mainSubject": "interbank overnight lending rates (main clause subject) / the central bank (inverted conditional clause subject)",
      "mainVerb": "would spike (main clause modal verb) / were ... to tighten (inverted conditional verb)",
      "optionBreakdown": [
        "A ('If were'): Incorrect — places 'were' directly after 'If' without a subject between them.",
        "B ('Were'): Correct — inverted conditional structure: 'Were + [Subject] + to [Verb]'.",
        "C ('Should'): Incorrect — 'Should' inversion takes a bare infinitive ('Should the bank tighten'), not 'to tighten'.",
        "D ('Had been'): Incorrect — past perfect passive does not fit 'to tighten'."
      ]
    }
  }
];

// Academic Reading Passages with Line Numbers & Tap-to-Save AWL Vocabulary
const READING_PASSAGES = [
  {
    id: 'read-01',
    title: 'Mycorrhizal Networks & Subterranean Forest Resource Allocation',
    topic: 'Botany & Isotope Ecology • TOEFL ITP Section 3',
    lines: [
      'Beneath the decomposing litter layer of temperate and boreal forests',
      'lies an intricate subterranean matrix known as the common mycorrhizal',
      'network (CMN). Formed by symbiotic associations between soil fungi',
      'and the cortical root tips of vascular plants, these microscopic hyphal',
      'conduits facilitate the bidirectional transfer of carbon, nitrogen, and',
      'phosphorus among neighboring trees. Whereas classical forest ecology',
      'predominantly emphasized competition for canopy light and surface',
      'moisture, contemporary carbon-isotope tracing experiments demonstrate',
      'that mature "hub" trees—often termed mother trees—actively subsidize',
      'heavily shaded understory seedlings.',
      'Crucially, this subterranean resource allocation is neither random',
      'nor strictly altruistic. When defoliating bark beetles attack an older',
      'Douglas fir, the injured specimen releases biochemical signaling',
      'compounds through the fungal filaments, prompting adjacent ponderosa',
      'pines to upregulate defensive phenolic enzymes within hours. Moreover,',
      'during seasonal drought, osmotic potentials enable deep-rooted trees',
      'to redistribute water to shallow-rooted neighbors, preserving the',
      'soil microclimate on which the entire fungal consortium depends.'
    ],
    awlWords: [
      {
        id: 'awl-facilitate',
        word: 'facilitate',
        partOfSpeech: 'verb',
        phonetic: '/fəˈsɪl.ɪ.teɪt/',
        lineRef: 'Line 5',
        toeflSynonym: 'expedite / make possible / promote',
        meaning: 'To make an action or biological process easier or more achievable.',
        contextQuote: '...these microscopic hyphal conduits facilitate the bidirectional transfer of carbon...'
      },
      {
        id: 'awl-predominantly',
        word: 'predominantly',
        partOfSpeech: 'adverb',
        phonetic: '/prɪˈdɒm.ɪ.nənt.li/',
        lineRef: 'Line 7',
        toeflSynonym: 'chiefly / primarily / mainly',
        meaning: 'Mainly; representing the strongest or most frequent element.',
        contextQuote: 'Whereas classical forest ecology predominantly emphasized competition...'
      },
      {
        id: 'awl-subsidize',
        word: 'subsidize',
        partOfSpeech: 'verb',
        phonetic: '/ˈsʌb.sɪ.daɪz/',
        lineRef: 'Line 9',
        toeflSynonym: 'support / supply / supplement',
        meaning: 'To support an organism or system by transferring surplus resources.',
        contextQuote: '...mature "hub" trees—often termed mother trees—actively subsidize heavily shaded understory seedlings.'
      },
      {
        id: 'awl-allocation',
        word: 'allocation',
        partOfSpeech: 'noun',
        phonetic: '/ˌæl.əˈkeɪ.ʃən/',
        lineRef: 'Line 11',
        toeflSynonym: 'distribution / apportionment / allotment',
        meaning: 'The process of distributing resources or nutrients for a specific purpose.',
        contextQuote: 'Crucially, this subterranean resource allocation is neither random nor strictly altruistic.'
      },
      {
        id: 'awl-adjacent',
        word: 'adjacent',
        partOfSpeech: 'adjective',
        phonetic: '/əˈdʒeɪ.sənt/',
        lineRef: 'Line 14',
        toeflSynonym: 'contiguous / neighboring / bordering',
        meaning: 'Situated next to or in close proximity to something else.',
        contextQuote: '...prompting adjacent ponderosa pines to upregulate defensive phenolic enzymes within hours.'
      }
    ],
    questions: [
      {
        id: 'rq-1',
        skill: 'Reading: Vocabulary in Context',
        question: 'The word "predominantly" in line 7 is closest in meaning to:',
        options: ['reluctantly', 'primarily', 'exclusively', 'tentatively'],
        correctIndex: 1,
        explanation: '"Predominantly" means mainly or primarily. Note that "exclusively" (100% only) is an extreme TOEFL distractor.'
      },
      {
        id: 'rq-2',
        skill: 'Reading: Factual Detail',
        question: 'According to lines 12–15, how do adjacent ponderosa pines react when a Douglas fir is attacked by bark beetles?',
        options: [
          'They sever their hyphal connections to isolate the beetle infestation.',
          'They pump surplus nitrogen toward the injured Douglas fir.',
          'They increase their synthesis of protective phenolic enzymes.',
          'They extend taproots deeper into the water table.'
        ],
        correctIndex: 2,
        explanation: 'Lines 13–15 state that biochemical signals prompt "adjacent ponderosa pines to upregulate defensive phenolic enzymes within hours."'
      },
      {
        id: 'rq-3',
        skill: 'Reading: Inference',
        question: 'What can be inferred from lines 15–18 about the fungi in the common mycorrhizal network?',
        options: [
          'Their survival depends on maintaining adequate moisture in the surrounding soil.',
          'They are capable of fixing atmospheric carbon without host trees.',
          'They only link trees that belong to the exact same botanical genus.',
          'They become dormant whenever older hub trees release phenolic enzymes.'
        ],
        correctIndex: 0,
        explanation: 'Lines 17–18 explain that water redistribution preserves "the soil microclimate on which the entire fungal consortium depends."'
      }
    ]
  },
  {
    id: 'read-02',
    title: 'The Antikythera Mechanism & Hellenistic Epicyclic Gearing',
    topic: 'History of Technology • TOEFL ITP Section 3',
    lines: [
      'Recovered in 1901 from a Roman-era shipwreck off the Greek island',
      'of Antikythera, a calcified mass of bronze gears radically revised',
      'historians’ appraisal of Hellenistic mechanical engineering. High-resolution',
      'computed tomography (CT) scans conducted a century later revealed',
      'at least thirty interlocking bronze gearwheels housed within a compact',
      'wooden frame no larger than a mantel clock. By rotating a lateral crank,',
      'an operator could compute the synodic phases of the Moon, predict',
      'eclipses via the 223-month Babylonian Saros cycle, and model the',
      'erratic retrograde motion of the five planets known in antiquity.',
      'What renders the device so anomalous is the complete absence of',
      'comparable differential gearwork in the archaeological record for',
      'the subsequent millennium. Sophisticated epicyclic gearing of this',
      'caliber did not resurface until fourteenth-century European cathedral',
      'clocks. Consequently, researchers postulate that an elite tradition',
      'of Rhodian or Corinthian instrument workshops persisted through',
      'hands-on apprenticeship networks that left scant written treatises.'
    ],
    awlWords: [
      {
        id: 'awl-appraisal',
        word: 'appraisal',
        partOfSpeech: 'noun',
        phonetic: '/əˈpreɪ.zəl/',
        lineRef: 'Line 3',
        toeflSynonym: 'evaluation / assessment / estimation',
        meaning: 'A formal judgment or assessment of the value or sophistication of something.',
        contextQuote: '...radically revised historians’ appraisal of Hellenistic mechanical engineering.'
      },
      {
        id: 'awl-compute',
        word: 'compute',
        partOfSpeech: 'verb',
        phonetic: '/kəmˈpjuːt/',
        lineRef: 'Line 7',
        toeflSynonym: 'calculate / reckon / determine',
        meaning: 'To determine mathematically or via mechanical calculation.',
        contextQuote: '...an operator could compute the synodic phases of the Moon...'
      },
      {
        id: 'awl-erratic',
        word: 'erratic',
        partOfSpeech: 'adjective',
        phonetic: '/ɪˈræt.ɪk/',
        lineRef: 'Line 9',
        toeflSynonym: 'irregular / unpredictable / uneven',
        meaning: 'Not even or regular in pattern or orbital movement.',
        contextQuote: '...and model the erratic retrograde motion of the five planets known in antiquity.'
      },
      {
        id: 'awl-anomalous',
        word: 'anomalous',
        partOfSpeech: 'adjective',
        phonetic: '/əˈnɒm.ə.ləs/',
        lineRef: 'Line 10',
        toeflSynonym: 'aberrant / atypical / exceptional',
        meaning: 'Deviating from what is standard, normal, or expected in a historical period.',
        contextQuote: 'What renders the device so anomalous is the complete absence of comparable differential gearwork...'
      },
      {
        id: 'awl-postulate',
        word: 'postulate',
        partOfSpeech: 'verb',
        phonetic: '/ˈpɒs.tʃʊ.leɪt/',
        lineRef: 'Line 14',
        toeflSynonym: 'hypothesize / posit / propose',
        meaning: 'To suggest or assume the existence of a historical or scientific fact as a basis for reasoning.',
        contextQuote: 'Consequently, researchers postulate that an elite tradition... persisted...'
      }
    ],
    questions: [
      {
        id: 'rq-4',
        skill: 'Reading: Vocabulary in Context',
        question: 'The word "anomalous" in line 10 is closest in meaning to:',
        options: ['celebrated', 'atypical', 'fragile', 'obsolete'],
        correctIndex: 1,
        explanation: '"Anomalous" means deviating from what is expected or standard—closest to "atypical".'
      },
      {
        id: 'rq-5',
        skill: 'Reading: Rhetorical Purpose',
        question: 'Why does the author mention "fourteenth-century European cathedral clocks" in lines 13–14?',
        options: [
          'To suggest the Antikythera Mechanism was actually manufactured during the Middle Ages',
          'To emphasize how technologically advanced the Hellenistic gearwork was for its era',
          'To illustrate how medieval clockmakers copied Roman naval blueprints',
          'To contrast wooden clock housings with bronze astronomical dials'
        ],
        correctIndex: 1,
        explanation: 'Noting that comparable gearing did not reappear for over a millennium highlights the extraordinary advancement of the ancient device.'
      }
    ]
  }
];

/**
 * FLUENCY & LISTENING STUDIO — PART 1: TOEFL LISTENING SIMULATOR (Part A & Part C)
 * Transcript is hidden until the user answers!
 */
const FLUENCY_LISTENING_SIMULATOR = [
  {
    id: 'lsim-1',
    partType: 'Part A • Short Dialogue',
    focusCategory: 'Idiomatic Expressions & Implied Meaning',
    title: 'Lab Equipment & Grant Funding',
    audioLines: [
      { speaker: 'Man', text: 'Did the dean approve the funding request for the new mass spectrometer?' },
      { speaker: 'Woman', text: 'Approve it? She told the chemistry department to put the whole proposal on the back burner until next fiscal year!' },
      { speaker: 'Narrator', text: 'What does the woman mean?' }
    ],
    question: 'What does the woman mean?',
    options: [
      'The chemistry department should test the spectrometer in the back laboratory.',
      'The dean wants the proposal to be postponed until a later time.',
      'The funding was approved for the current semester.',
      'The proposal was accidentally destroyed in a laboratory fire.'
    ],
    correctIndex: 1,
    skill: 'Listening Skill 17: Idioms ("put on the back burner")',
    idiomSpotlight: '"Put (something) on the back burner" — To temporarily set aside or postpone a project or priority until a later time.',
    toneNotes: 'Notice the woman’s echo question ("Approve it?") with rising-falling incredulous intonation, which signals an emphatic negative reversal.',
    explanation: 'When the woman says the dean told them to "put the whole proposal on the back burner until next fiscal year," she means the request has been deferred/postponed.'
  },
  {
    id: 'lsim-2',
    partType: 'Part A • Short Dialogue',
    focusCategory: 'Implied Meaning & Second-Order Wish',
    title: 'Graduate Seminar Presentation',
    audioLines: [
      { speaker: 'Woman', text: 'How did your presentation on Keynesian fiscal multipliers go this morning?' },
      { speaker: 'Man', text: 'If only I hadn’t tried to cram fifteen econometric tables into a ten-minute slot.' },
      { speaker: 'Narrator', text: 'What does the man imply?' }
    ],
    question: 'What does the man imply?',
    options: [
      'He finished his presentation ten minutes early.',
      'He wishes he had included more econometric tables.',
      'His presentation had too much data for the allotted time.',
      'He decided not to attend the morning seminar.'
    ],
    correctIndex: 2,
    skill: 'Listening Skill 15: Untrue Wishes ("If only I hadn’t...")',
    idiomSpotlight: '"Cram (something) into" — To force too much material into a short time or small space; "If only I hadn’t..." expresses regret about a past action that actually happened.',
    toneNotes: 'Falling sighing intonation on "If only I hadn’t..." conveys self-critique: he DID include 15 tables, and it overwhelmed the 10-minute presentation.',
    explanation: '"If only I hadn’t tried to cram..." means he actually did put fifteen tables into a ten-minute presentation and regrets making it too dense.'
  },
  {
    id: 'lsim-3',
    partType: 'Part C • Academic Lecture',
    focusCategory: 'Academic Tone & Rhetorical Signposting',
    title: 'Geomorphology Lecture: Permafrost Thermokarst Lakes',
    audioLines: [
      {
        speaker: 'Professor',
        text: 'Now, for decades, Arctic hydrologists assumed that thawing permafrost simply released meltwater gradually into existing river basins. Yet recent satellite interferometry paints a far more volatile picture. When ice-rich yedoma permafrost thaws abruptly, the ground surface collapses into sinkhole depressions that rapidly fill with meltwater, forming what we call thermokarst lakes. Here is the catch: anaerobic microbes at the bottom of these newly formed lakes digest ancient organic carbon and release plumes of methane—a greenhouse gas roughly twenty-eight times more potent than carbon dioxide over a century timescale.'
      },
      {
        speaker: 'Narrator',
        text: 'Why does the professor say "Here is the catch" during the lecture?'
      }
    ],
    question: 'Why does the professor say "Here is the catch" during the lecture?',
    options: [
      'To introduce a critical, problematic consequence of thermokarst lake formation',
      'To explain how Arctic researchers trap methane bubbles using nets',
      'To correct a calculation error in the satellite interferometry data',
      'To reassure students that permafrost thawing has slowed down'
    ],
    correctIndex: 0,
    skill: 'Listening Part C: Academic Tone & Discourse Markers',
    idiomSpotlight: '"Here is the catch" — Spoken academic discourse marker used to flag a hidden complication, drawback, or positive-feedback hazard.',
    toneNotes: 'The professor shifts from descriptive exposition to an cautionary, emphatic tone on "Here is the catch" to alert listeners to the methane feedback loop.',
    explanation: '"Here is the catch" signals a crucial complication: thermokarst lakes do not merely hold meltwater; their anaerobic microbes release potent methane gas.'
  },
  {
    id: 'lsim-4',
    partType: 'Part C • Academic Lecture',
    focusCategory: 'Academic Tone & Conceptual Contrast',
    title: 'Behavioral Economics: The Endowment Effect',
    audioLines: [
      {
        speaker: 'Professor',
        text: 'According to standard neoclassical utility theory, your willingness to pay for an object should equal your willingness to accept compensation to part with it. In practice, however, human decision-makers stubbornly defy that symmetry. In a classic experiment at Cornell, students who were randomly gifted a university coffee mug demanded nearly twice as much money to sell the mug as non-owners were willing to pay to acquire the exact same mug. Behavioral economists term this disparity the endowment effect, attributing it to loss aversion—the psychological reality that relinquishing a possession hurts roughly twice as much as gaining it feels good.'
      },
      {
        speaker: 'Narrator',
        text: 'What is the professor’s attitude toward standard neoclassical utility theory in this context?'
      }
    ],
    question: 'What is the professor’s attitude toward standard neoclassical utility theory in this context?',
    options: [
      'She believes it accurately predicts how students trade coffee mugs.',
      'She views its assumption of symmetry as contradicted by real-world human behavior.',
      'She argues that it should replace behavioral economics in university curricula.',
      'She thinks the Cornell experiment was too small to test the theory.'
    ],
    correctIndex: 1,
    skill: 'Listening Part C: Speaker Stance & Academic Tone',
    idiomSpotlight: '"Part with (something)" — To give up possession of something; "Defy that symmetry" — To act contrary to a theoretical balance.',
    toneNotes: 'By contrasting "According to standard... theory" with "In practice, however, human decision-makers stubbornly defy that symmetry," the professor highlights the empirical limitation of the classical model.',
    explanation: 'The professor contrasts neoclassical theory’s prediction of equal valuation with empirical evidence from the Cornell mug experiment showing loss aversion.'
  }
];

/**
 * FLUENCY & LISTENING STUDIO — PART 2: ACTIVE SHADOWING & SPEAKING FLUENCY COACH
 * Real-time SpeechRecognition word matching, Match %, and WPM tracker
 */
const FLUENCY_SHADOWING_SCRIPTS = [
  {
    id: 'shad-1',
    title: 'Academic Lecture: Thermohaline Circulation & Ocean Conveyors',
    category: 'Academic Paragraph • C1 Prosody',
    recommendedWpm: 135,
    ipaGuide: 'Stress content nouns ("thermohaline", "salinity", "upwelling") • Link prepositions smoothly',
    targetText: 'Global thermohaline circulation is driven by surface gradients in water temperature and salinity across high latitude oceans, transporting vital thermal energy from equatorial regions toward the poles.'
  },
  {
    id: 'shad-2',
    title: 'Campus Seminar Discussion: Defending a Research Methodology',
    category: 'Conversational Academic Script • B2/C1 Bridge',
    recommendedWpm: 145,
    ipaGuide: 'Use falling-rising concession tone on "While I acknowledge..." followed by crisp emphasis on "longitudinal panel data"',
    targetText: 'While I acknowledge that cross sectional surveys have limitations, our longitudinal panel data controls for seasonal volatility across all twelve metropolitan regions.'
  },
  {
    id: 'shad-3',
    title: 'Macroeconomics Briefing: Monetary Policy & Inflation Expectations',
    category: 'Executive & Academic Fluency • 600+ Level',
    recommendedWpm: 140,
    ipaGuide: 'Pause briefly after "anchored," • Articulate "countercyclical" (/ˌkaʊn.tərˈsaɪ.klɪ.kəl/) clearly',
    targetText: 'When long term inflation expectations remain firmly anchored, central banks can deploy countercyclical monetary policy without triggering capital flight or currency depreciation.'
  }
];

/**
 * TIMED MINI & FULL SIMULATION MODE ("Simulasi" Tab)
 * 15 High-Difficulty Questions with strict TOEFL per-question pacing:
 * - Structure questions: 35 seconds target pacing
 * - Reading questions: 55 seconds target pacing
 * - Listening questions: 35 seconds target pacing
 */
const SIMULASI_SPRINT_15_QUESTIONS = [
  // Questions 1–3: Listening Comprehension (35s pacing)
  {
    id: 'sim15-1',
    section: 'Listening',
    part: 'Section 1 • Part A (Short Dialogue)',
    skill: 'Listening Skill 5: Idiomatic Agreement & Schedule Changes',
    targetSeconds: 35,
    audioTranscript: [
      { speaker: 'Woman', text: 'I thought the abstract submission deadline for the linguistics symposium was this Friday.' },
      { speaker: 'Man', text: 'So did I, until the department chair sent out a memo extending it by ten days.' },
      { speaker: 'Narrator', text: 'What does the man mean?' }
    ],
    question: 'What does the man mean?',
    options: [
      'He already submitted his linguistics abstract on Friday.',
      'The department chair canceled the upcoming symposium.',
      'Participants now have more time to turn in their abstracts.',
      'He never received the memo from the department office.'
    ],
    correctIndex: 2,
    explanation: '"So did I" means the man also believed the deadline was Friday, but the memo "extending it by ten days" means participants have extra time.'
  },
  {
    id: 'sim15-2',
    section: 'Listening',
    part: 'Section 1 • Part A (Negative Emphasis)',
    skill: 'Listening Skill 8: Emphatic Negatives ("Hardly!")',
    targetSeconds: 35,
    audioTranscript: [
      { speaker: 'Man', text: 'Were you able to get Prof. Henderson’s signature on your independent study form?' },
      { speaker: 'Woman', text: 'Hardly! There must have been twenty students lined up outside his office door.' },
      { speaker: 'Narrator', text: 'What does the woman imply?' }
    ],
    question: 'What does the woman imply?',
    options: [
      'She decided to drop the independent study course.',
      'She could not get the signature because the line was too long.',
      'Prof. Henderson signed twenty forms in just a few minutes.',
      'She waited until everyone else left the office.'
    ],
    correctIndex: 1,
    explanation: '"Hardly!" functions as an emphatic negative ("No, not at all") explained by the long queue outside the professor’s door.'
  },
  {
    id: 'sim15-3',
    section: 'Listening',
    part: 'Section 1 • Part A (Causal Inference)',
    skill: 'Listening Skill 12: Second-Order Conditionals',
    targetSeconds: 35,
    audioTranscript: [
      { speaker: 'Woman', text: 'Are you still planning to take Advanced Econometrics with Professor Vance next semester?' },
      { speaker: 'Man', text: 'Had I known Linear Algebra was a strict prerequisite, I wouldn’t have registered for it.' },
      { speaker: 'Narrator', text: 'What does the man mean?' }
    ],
    question: 'What does the man mean?',
    options: [
      'He already completed Linear Algebra last year.',
      'He registered for the course without realizing Linear Algebra was required.',
      'Professor Vance waived the prerequisite for him.',
      'He prefers Linear Algebra over Advanced Econometrics.'
    ],
    correctIndex: 1,
    explanation: '"Had I known... I wouldn’t have registered" is an inverted past unreal conditional meaning he did NOT know about the prerequisite when he registered.'
  },

  // Questions 4–10: Structure & Written Expression (Strict 35s per-question pacing)
  {
    id: 'sim15-4',
    section: 'Structure',
    part: 'Section 2 • Part A (Sentence Completion)',
    skill: 'Skill 15: Inversion with Negative Expressions',
    targetSeconds: 35,
    question: 'Not until the late nineteenth century _______ that malaria was transmitted by the Anopheles mosquito rather than by marsh vapors.',
    options: [
      'epidemiologists demonstrated',
      'did epidemiologists demonstrate',
      'that epidemiologists demonstrated',
      'when epidemiologists demonstrated'
    ],
    correctIndex: 1,
    explanation: 'When "Not until [time phrase]" opens a clause, the main clause auxiliary verb and subject must invert ("did epidemiologists demonstrate").'
  },
  {
    id: 'sim15-5',
    section: 'Structure',
    part: 'Section 2 • Part A (Sentence Completion)',
    skill: 'Skill 35: Subjunctive Mood After Urgency Verbs',
    targetSeconds: 35,
    question: 'The aviation safety board mandated that every commercial aircraft _______ with dual-frequency flight data recorders before January.',
    options: [
      'is retrofitted',
      'be retrofitted',
      'was retrofitted',
      'to be retrofitted'
    ],
    correctIndex: 1,
    explanation: 'After verbs of mandate/demand ("mandated that..."), formal American grammar requires the subjunctive bare infinitive ("be retrofitted").'
  },
  {
    id: 'sim15-6',
    section: 'Structure',
    part: 'Section 2 • Part A (Sentence Completion)',
    skill: 'Skill 10: Noun Clause Connectors as Subjects',
    targetSeconds: 35,
    question: '_______ triggers the sudden geomagnetic reversals recorded in mid-ocean ridge basalt remains a subject of intense geophysical debate.',
    options: [
      'What',
      'That what',
      'Whatever it',
      'Because what'
    ],
    correctIndex: 0,
    explanation: '"What" serves simultaneously as the subject of the verb "triggers" inside the noun clause and introduces the entire noun clause subject of the main verb "remains".'
  },
  {
    id: 'sim15-7',
    section: 'Structure',
    part: 'Section 2 • Part B (Error Recognition)',
    skill: 'Skill 46: Adverb vs. Adjective before Past Participles',
    targetSeconds: 35,
    question: 'Because [A] of its exceptionally high [B] thermal conductivity, synthetic diamond is [C] wide used as a heat sink in [D] high-power semiconductor lasers.',
    options: [
      '[A] of its',
      '[B] thermal',
      '[C] wide',
      '[D] high-power'
    ],
    correctIndex: 2,
    explanation: 'To modify the past participle verb "used", an adverb ("widely") is required instead of the adjective "[C] wide".'
  },
  {
    id: 'sim15-8',
    section: 'Structure',
    part: 'Section 2 • Part B (Error Recognition)',
    skill: 'Skill 25: Parallel Structure with Comparisons',
    targetSeconds: 35,
    question: 'The [A] acoustic resonance of a seventeenth-century Cremonese violin is [B] far richer than [C] a modern factory-made instrument [D] of similar dimensions.',
    options: [
      '[A] acoustic resonance',
      '[B] far richer',
      '[C] a modern factory-made instrument',
      '[D] of similar dimensions'
    ],
    correctIndex: 2,
    explanation: 'Illogical Comparison: "The acoustic resonance" cannot be compared directly to "a modern factory-made instrument". It must be "that of a modern factory-made instrument".'
  },
  {
    id: 'sim15-9',
    section: 'Structure',
    part: 'Section 2 • Part B (Error Recognition)',
    skill: 'Skill 20: Subject-Verb Agreement after Prepositional Phrases',
    targetSeconds: 35,
    question: 'The [A] stringent enforcement of maritime sulfur emission caps across international shipping lanes [B] have led to [C] measurable reductions in [D] coastal acid deposition.',
    options: [
      '[A] stringent',
      '[B] have led',
      '[C] measurable',
      '[D] coastal'
    ],
    correctIndex: 1,
    explanation: 'The singular head noun of the subject is "enforcement" (not "caps" or "lanes"). Therefore, "[B] have led" must be singular "has led".'
  },
  {
    id: 'sim15-10',
    section: 'Structure',
    part: 'Section 2 • Part B (Error Recognition)',
    skill: 'Skill 42: Distinguishing "Another" and "Other"',
    targetSeconds: 35,
    question: 'Unlike [A] another arachnids that rely on silk webs to ensnare prey, jumping spiders [B] utilize acute binocular vision [C] to stalk insects [D] actively.',
    options: [
      '[A] another',
      '[B] utilize',
      '[C] to stalk',
      '[D] actively'
    ],
    correctIndex: 0,
    explanation: '"Another" can only modify a singular countable noun. Because "arachnids" is plural, "[A] another" must be "other".'
  },

  // Questions 11–15: Reading Comprehension (Strict 55s per-question pacing)
  {
    id: 'sim15-11',
    section: 'Reading',
    part: 'Section 3 • Academic Passage (Glaciology)',
    skill: 'Reading: Vocabulary in Context',
    targetSeconds: 55,
    passageSnippet: '(Line 1) In paleoclimatology, deep ice cores drilled from the East Antarctic Plateau serve as high-resolution archives of ancient atmospheric composition. As fallen snow accumulates and compacts into porous firn and eventually solid glacial ice at depths of sixty to one hundred meters, (5) microscopic air bubbles become hermetically sealed, preserving pristine samples of trace greenhouse gases from up to 800,000 years ago. However, because air continues to diffuse through the porous firn layer until pore close-off occurs, the trapped gas at any given stratum is consistently younger than the surrounding ice matrix.',
    question: 'The word "pristine" in line 5 is closest in meaning to:',
    options: [
      'compressed',
      'uncontaminated',
      'volatile',
      'crystalline'
    ],
    correctIndex: 1,
    explanation: 'Because the air bubbles are "hermetically sealed" inside deep ice, the preserved gas samples remain pure and unspoiled ("uncontaminated").'
  },
  {
    id: 'sim15-12',
    section: 'Reading',
    part: 'Section 3 • Academic Passage (Glaciology)',
    skill: 'Reading: Factual Detail',
    targetSeconds: 55,
    passageSnippet: '(Line 1) In paleoclimatology, deep ice cores drilled from the East Antarctic Plateau serve as high-resolution archives of ancient atmospheric composition. As fallen snow accumulates and compacts into porous firn and eventually solid glacial ice at depths of sixty to one hundred meters, (5) microscopic air bubbles become hermetically sealed, preserving pristine samples of trace greenhouse gases from up to 800,000 years ago. However, because air continues to diffuse through the porous firn layer until pore close-off occurs, the trapped gas at any given stratum is consistently younger than the surrounding ice matrix.',
    question: 'According to the passage, what is "firn"?',
    options: [
      'A thermal drill bit used on the East Antarctic Plateau',
      'An intermediate stage of compacted snow before it turns into solid glacial ice',
      'A trace greenhouse gas found at depths of one hundred meters',
      'A surface wind pattern that erodes ancient ice layers'
    ],
    correctIndex: 1,
    explanation: 'The sequence "As fallen snow accumulates and compacts into porous firn and eventually solid glacial ice" defines firn as the transitional stage between snow and solid ice.'
  },
  {
    id: 'sim15-13',
    section: 'Reading',
    part: 'Section 3 • Academic Passage (Glaciology)',
    skill: 'Reading: Causal Inference',
    targetSeconds: 55,
    passageSnippet: '(Line 1) In paleoclimatology, deep ice cores drilled from the East Antarctic Plateau serve as high-resolution archives of ancient atmospheric composition. As fallen snow accumulates and compacts into porous firn and eventually solid glacial ice at depths of sixty to one hundred meters, (5) microscopic air bubbles become hermetically sealed, preserving pristine samples of trace greenhouse gases from up to 800,000 years ago. However, because air continues to diffuse through the porous firn layer until pore close-off occurs, the trapped gas at any given stratum is consistently younger than the surrounding ice matrix.',
    question: 'Why is the air trapped inside an ice core stratum younger than the ice surrounding it?',
    options: [
      'Modern air leaks into the ice core when it is brought to the surface.',
      'Radioactive decay alters the age of the ice crystals over millennia.',
      'Atmospheric gas can still circulate through the porous firn until the pores seal deep underground.',
      'Meltwater from the surface trickles down and replaces older air bubbles.'
    ],
    correctIndex: 2,
    explanation: 'The final sentence explains that "because air continues to diffuse through the porous firn layer until pore close-off occurs, the trapped gas at any given stratum is consistently younger than the surrounding ice matrix."'
  },
  {
    id: 'sim15-14',
    section: 'Reading',
    part: 'Section 3 • Academic Passage (Urban Ecology)',
    skill: 'Reading: Vocabulary in Context',
    targetSeconds: 55,
    passageSnippet: '(Line 1) Urban heat islands (UHIs) arise when natural vegetative cover is replaced by impervious surfaces such as asphalt and concrete that exhibit low solar reflectance, or albedo. During summer afternoons, metropolitan cores can register ambient temperatures four to seven degrees Celsius higher (5) than contiguous rural parishes. Beyond exacerbating peak electricity demand for air conditioning, elevated nocturnal temperatures impede physiological recovery during heatwaves and accelerate the photochemical formation of ground-level ozone.',
    question: 'The word "contiguous" in line 5 is closest in meaning to:',
    options: [
      'adjacent',
      'prosperous',
      'elevated',
      'sparsely populated'
    ],
    correctIndex: 0,
    explanation: '"Contiguous" means sharing a border or touching—closest in meaning to "adjacent".'
  },
  {
    id: 'sim15-15',
    section: 'Reading',
    part: 'Section 3 • Academic Passage (Urban Ecology)',
    skill: 'Reading: Negative Factual Detail ("EXCEPT")',
    targetSeconds: 55,
    passageSnippet: '(Line 1) Urban heat islands (UHIs) arise when natural vegetative cover is replaced by impervious surfaces such as asphalt and concrete that exhibit low solar reflectance, or albedo. During summer afternoons, metropolitan cores can register ambient temperatures four to seven degrees Celsius higher (5) than contiguous rural parishes. Beyond exacerbating peak electricity demand for air conditioning, elevated nocturnal temperatures impede physiological recovery during heatwaves and accelerate the photochemical formation of ground-level ozone.',
    question: 'All of the following are mentioned in the passage as consequences of urban heat islands EXCEPT:',
    options: [
      'Increased peak consumption of electrical power for cooling',
      'Higher nighttime temperatures that hinder human recovery during heatwaves',
      'Faster chemical production of ground-level ozone',
      'Increased rainfall and flash flooding in surrounding rural parishes'
    ],
    correctIndex: 3,
    explanation: 'Options A, B, and C are explicitly mentioned in the final sentence. Rainfall and flash flooding in rural parishes are never mentioned.'
  }
];
