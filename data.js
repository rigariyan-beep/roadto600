/**
 * RoadTo600: TOEFL ITP & Fluency Mastery
 * Official Conversion Tables, Seed Database, Listening/Fluency Studio, 
 * 15-Question Simulasi Data & Comprehensive Indonesian TOEFL Materials (Materi & Tips Trik 600+)
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
    description: 'Titik awal pengukuran: fondasi B1 yang solid dengan potensi peningkatan besar melalui eliminasi jebakan Structure & Listening.'
  },
  {
    id: 'milestone-550',
    label: 'Mid-Goal (550)',
    badge: 'B2 Upper-Int',
    rawL: 37,
    rawS: 31,
    rawR: 38,
    description: 'Ambang batas umum beasiswa internasional. Sangat realistis dicapai dengan menguasai 25 aturan utama Structure.'
  },
  {
    id: 'target-600-balanced',
    label: 'Target 600 (Balanced)',
    badge: 'C1 Advanced',
    rawL: 43,
    rawS: 36,
    rawR: 44,
    description: 'Blueprint klasik 600+: Listening 43/50 [59] • Structure 36/40 [61] • Reading 44/50 [60] => Skor Total 600.'
  },
  {
    id: 'target-600-grammar',
    label: '600 Grammar Carry',
    badge: 'C1 Strategic',
    rawL: 40,
    rawS: 38,
    rawR: 41,
    description: 'Strategi Grammar Carry: Memaksimalkan Structure mendekati sempurna (38/40) untuk mengamankan margin Listening & Reading.'
  }
];

const DAILY_HABITS_CONFIG = [
  {
    id: 'habit_structure',
    title: 'Drill 60 Kaidah Grammar Structure (15 mnt)',
    subtitle: 'Kuasai inversi, reduced clauses, parallel structure & jebakan Error Recognition.',
    minutes: 15,
    category: 'Section 2 • Grammar',
    targetTab: 'drills',
    targetSubtab: 'structure',
    xp: 50
  },
  {
    id: 'habit_reading',
    title: 'Bacaan Akademik + 5 Kosakata AWL (15 mnt)',
    subtitle: 'Teks akademis berbaris angka + fitur simpan kartu kosakata akademis.',
    minutes: 15,
    category: 'Section 3 • Reading & Kosakata',
    targetTab: 'drills',
    targetSubtab: 'reading',
    xp: 50
  },
  {
    id: 'habit_fluency',
    title: 'Shadowing & Listening Fluency (15 mnt)',
    subtitle: 'Latihan aktif menyimak & menirukan intonasi dosen akademis untuk kelancaran.',
    minutes: 15,
    category: 'Section 1 + Spoken Fluency',
    targetTab: 'fluency',
    targetSubtab: 'shadowing',
    xp: 50
  }
];

/**
 * SEED DATABASE (PRE-LOADED EXACT JSON DATA + LONGMAN 60-SKILLS LAB)
 * Semua pembahasan dalam Bahasa Indonesia yang edukatif dan komprehensif.
 */
const SEED_STRUCTURE_QUESTIONS = [
  {
    "id": "str-1",
    "section": "Structure Part A",
    "skill": "Skill 15: Inversion with Negative Expressions",
    "question": "Rarely _______ located near city lights or at lower elevations.",
    "options": ["observatories are", "are", "in the observatories", "are observatories"],
    "correctIndex": 3,
    "explanation": "Ekspresi negatif atau pembatas (Rarely, Seldom, Never, Scarcely, Hardly, Barely, Only in) yang diletakkan di awal kalimat mewajibkan terjadinya Inversi Subjek-Kata Kerja (Subject-Verb Inversion). Kata kerja bantu 'are' harus mendahului subjek jamak 'observatories'.",
    "structuralAnalysis": {
      "mainSubject": "observatories (kata benda jamak)",
      "mainVerb": "are located (frasa kata kerja pasif, terpisah karena inversi: [Auxiliary 'are'] + [Subjek 'observatories'] + [Past Participle 'located'])",
      "optionBreakdown": [
        "A ('observatories are'): Salah — susunan normal S+V tanpa pembalikan (inversi) setelah kata negatif di depan kalimat.",
        "B ('are'): Salah — tidak menyertakan subjek utama kalimat sama sekali.",
        "C ('in the observatories'): Salah — mengubah 'observatories' menjadi objek dari preposisi 'in', sehingga kata kerja kehilangan subjek.",
        "D ('are observatories'): Benar — membalik kata kerja bantu 'are' mendahului subjek jamak 'observatories'."
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
    "explanation": "Kesalahan Perbandingan Tidak Logis (Illogical Comparison): Kita tidak bisa membandingkan 'the climate' (iklim) secara langsung dengan 'the Gobi Desert' (nama tempat/gurun). Hal yang dibandingkan harus setara, yaitu iklim dengan iklim: 'that of the Gobi Desert' (menggunakan kata ganti 'that' untuk menggantikan 'the climate').",
    "structuralAnalysis": {
      "mainSubject": "The climate (kata benda inti tunggal yang diterangkan oleh 'of Indonesia')",
      "mainVerb": "is (linking verb yang menghubungkan subjek dengan predikat perbandingan 'much more humid')",
      "optionBreakdown": [
        "[A] climate: Benar — kata benda tunggal yang menjadi subjek perbandingan.",
        "[B] much more: Benar — intensifier komparatif ('much') + penanda komparatif ('more') sebelum kata sifat 'humid'.",
        "[C] the Gobi Desert: SALAH (Perbandingan Tidak Logis) — membandingkan iklim secara langsung dengan gurun fisik. Harus diperbaiki menjadi 'that of the Gobi Desert'.",
        "[D] in winter: Benar — frasa preposisi keterangan waktu."
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
    "explanation": "Klausa utama sudah memiliki subjek lengkap ('The macroeconomic data') dan kata kerja utama ('indicated'). Oleh karena itu, bagian yang kosong memerlukan klausa relatif pasif yang disederhanakan (reduced passive adjective clause: dari 'which was presented' diringkas menjadi 'presented'), bukan kata kerja utama baru ('was presented').",
    "structuralAnalysis": {
      "mainSubject": "The macroeconomic data",
      "mainVerb": "indicated (kata kerja lampau transitif yang berfungsi sebagai predikat utama)",
      "optionBreakdown": [
        "A ('presenting'): Salah — bentuk participle aktif (-ing) berarti data tersebut yang mempresentasikan sesuatu, bukan disajikan.",
        "B ('presented'): Benar — reduced adjective clause berbentuk pasif ('[which was] presented in the annual... report').",
        "C ('was presented'): Salah — menyebabkan kesalahan kata kerja ganda (double-verb error) berdampingan dengan predikat 'indicated' tanpa kata penghubung.",
        "D ('which presenting'): Salah — relatif pronoun ('which') tidak dapat langsung diikuti participle tanpa kata kerja bantu to-be."
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
    "explanation": "Subjek utama kalimat adalah kata benda tunggal ('The comprehensive evaluation'), bukan kata jamak 'branches' atau 'registers' yang berada di dalam frasa preposisi penyekat. Oleh sebab itu, kata kerja harus berbentuk tunggal: 'has revealed', bukan 'have revealed'.",
    "structuralAnalysis": {
      "mainSubject": "The comprehensive evaluation (kata benda inti tunggal; abaikan frasa preposisi panjang 'of fixed asset registers across multiple regional branches')",
      "mainVerb": "has revealed (pada soal tertulis keliru sebagai bentuk jamak 'have revealed')",
      "optionBreakdown": [
        "[A] comprehensive: Benar — kata sifat yang memodifikasi kata benda tunggal 'evaluation'.",
        "[B] have revealed: SALAH (Subject-Verb Agreement) — kata kerja bantu jamak 'have' bertentangan dengan subjek tunggal 'evaluation'; harus diubah menjadi 'has revealed'.",
        "[C] significant: Benar — kata sifat yang memodifikasi kata benda jamak 'discrepancies'.",
        "[D] depreciation rates: Benar — kata benda majemuk jamak sebagai objek dari preposisi 'in'."
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
    "explanation": "Konjungsi berpasangan ('not only ... but also') wajib menggabungkan dua struktur gramatikal yang setara/paralel. Karena setelah 'not only' diikuti frasa preposisi ('for their rapid assay speed'), maka setelah 'but also' harus diikuti frasa preposisi ('for their minimal reagent consumption'), bukan anak kalimat lengkap ('because they consume...').",
    "structuralAnalysis": {
      "mainSubject": "Microfluidic diagnostic chips (frasa kata benda jamak)",
      "mainVerb": "are prized (kata kerja pasif utama)",
      "optionBreakdown": [
        "[A] not only: Benar — bagian pertama dari pasangan konjungsi korelatif.",
        "[B] rapid: Benar — kata sifat yang memodifikasi 'assay speed'.",
        "[C] but also because they: SALAH (Kesejajaran Struktur) — memasangkan frasa preposisi ('for + noun phrase') dengan klausa utuh ('because + S + V'). Seharusnya 'but also for their minimal reagent consumption'.",
        "[D] consume minimal: Secara gramatikal benar di dalam klausanya sendiri, namun kemunculan klausa tersebut melanggar aturan paralelisme."
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
    "explanation": "Dalam kalimat pengandaian bentuk kedua (unreal conditional) yang memuat pola 'were to + kata kerja dasar' ('If the central bank were to tighten...'), kata penghubung 'if' dapat dihilangkan dengan cara menginversi kata kerja 'Were' ke awal kalimat mendahului subjek: 'Were + Subject + to Verb'.",
    "structuralAnalysis": {
      "mainSubject": "interbank overnight lending rates (subjek klausa utama) / the central bank (subjek klausa kondisional yang diinversi)",
      "mainVerb": "would spike (kata kerja modal pada klausa utama) / were ... to tighten (kata kerja kondisional yang diinversi)",
      "optionBreakdown": [
        "A ('If were'): Salah — meletakkan 'were' langsung setelah 'If' tanpa ada subjek di antara keduanya.",
        "B ('Were'): Benar — susunan inversi kondisional yang tepat: 'Were + [Subjek] + to [Kata Kerja Dasar]'.",
        "C ('Should'): Salah — inversi 'Should' diikuti oleh bare infinitive tanpa 'to' ('Should the bank tighten'), bukan 'to tighten'.",
        "D ('Had been'): Salah — pola past perfect passive tidak sesuai dengan pelengkap infinitive 'to tighten'."
      ]
    }
  }
];

// Academic Reading Passages with Line Numbers, AWL Vocabulary & Indonesian Explanations
const READING_PASSAGES = [
  {
    id: 'read-01',
    title: 'Mycorrhizal Networks & Subterranean Forest Resource Allocation',
    topic: 'Botani & Ekologi Isotop • TOEFL ITP Section 3',
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
        meaning: 'Mempermudah atau memperlancar suatu proses biologis atau tindakan.',
        contextQuote: '...these microscopic hyphal conduits facilitate the bidirectional transfer of carbon...'
      },
      {
        id: 'awl-predominantly',
        word: 'predominantly',
        partOfSpeech: 'adverb',
        phonetic: '/prɪˈdɒm.ɪ.nənt.li/',
        lineRef: 'Line 7',
        toeflSynonym: 'chiefly / primarily / mainly',
        meaning: 'Secara dominan; terutama; mewakili unsur yang paling kuat atau lazim.',
        contextQuote: 'Whereas classical forest ecology predominantly emphasized competition...'
      },
      {
        id: 'awl-subsidize',
        word: 'subsidize',
        partOfSpeech: 'verb',
        phonetic: '/ˈsʌb.sɪ.daɪz/',
        lineRef: 'Line 9',
        toeflSynonym: 'support / supply / supplement',
        meaning: 'Menyokong atau memberikan subsidi nutrisi/energi kepada organisme lain.',
        contextQuote: '...mature "hub" trees—often termed mother trees—actively subsidize heavily shaded understory seedlings.'
      },
      {
        id: 'awl-allocation',
        word: 'allocation',
        partOfSpeech: 'noun',
        phonetic: '/ˌæl.əˈkeɪ.ʃən/',
        lineRef: 'Line 11',
        toeflSynonym: 'distribution / apportionment / allotment',
        meaning: 'Alokasi; proses pendistribusian sumber daya untuk fungsi tertentu.',
        contextQuote: 'Crucially, this subterranean resource allocation is neither random nor strictly altruistic.'
      },
      {
        id: 'awl-adjacent',
        word: 'adjacent',
        partOfSpeech: 'adjective',
        phonetic: '/əˈdʒeɪ.sənt/',
        lineRef: 'Line 14',
        toeflSynonym: 'contiguous / neighboring / bordering',
        meaning: 'Bersebelahan; berada tepat di samping atau sangat dekat.',
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
        explanation: 'Kata "predominantly" berarti terutama, sebagian besar, atau secara pokok (primarily). Pilihan "exclusively" (hanya/eksklusif 100%) adalah kata jebakan yang terlalu ekstrem dalam TOEFL.'
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
        explanation: 'Baris 13–15 menyatakan bahwa sinyal biokimia memicu "adjacent ponderosa pines to upregulate defensive phenolic enzymes within hours" (meningkatkan produksi enzim fenolik pertahanan).'
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
        explanation: 'Baris 17–18 menjelaskan bahwa pohon berakar dalam mendistribusikan air untuk menjaga "the soil microclimate on which the entire fungal consortium depends" (kelangsungan hidup jamur bergantung pada kelembapan iklim mikro tanah).'
      }
    ]
  },
  {
    id: 'read-02',
    title: 'The Antikythera Mechanism & Hellenistic Epicyclic Gearing',
    topic: 'Sejarah Teknologi • TOEFL ITP Section 3',
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
        meaning: 'Penilaian atau evaluasi formal mengenai mutu, nilai, atau kecanggihan sesuatu.',
        contextQuote: '...radically revised historians’ appraisal of Hellenistic mechanical engineering.'
      },
      {
        id: 'awl-compute',
        word: 'compute',
        partOfSpeech: 'verb',
        phonetic: '/kəmˈpjuːt/',
        lineRef: 'Line 7',
        toeflSynonym: 'calculate / reckon / determine',
        meaning: 'Menghitung secara matematis atau melalui kalkulasi mekanis.',
        contextQuote: '...an operator could compute the synodic phases of the Moon...'
      },
      {
        id: 'awl-erratic',
        word: 'erratic',
        partOfSpeech: 'adjective',
        phonetic: '/ɪˈræt.ɪk/',
        lineRef: 'Line 9',
        toeflSynonym: 'irregular / unpredictable / uneven',
        meaning: 'Tidak teratur; tidak menentu atau menyimpang dari pola pergerakan normal.',
        contextQuote: '...and model the erratic retrograde motion of the five planets known in antiquity.'
      },
      {
        id: 'awl-anomalous',
        word: 'anomalous',
        partOfSpeech: 'adjective',
        phonetic: '/əˈnɒm.ə.ləs/',
        lineRef: 'Line 10',
        toeflSynonym: 'aberrant / atypical / exceptional',
        meaning: 'Anomali; menyimpang dari apa yang wajar, standar, atau lazim pada masanya.',
        contextQuote: 'What renders the device so anomalous is the complete absence of comparable differential gearwork...'
      },
      {
        id: 'awl-postulate',
        word: 'postulate',
        partOfSpeech: 'verb',
        phonetic: '/ˈpɒs.tʃʊ.leɪt/',
        lineRef: 'Line 14',
        toeflSynonym: 'hypothesize / posit / propose',
        meaning: 'Mengemukakan hipotesis atau mendalilkan keberadaan suatu fakta sebagai dasar penalaran.',
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
        explanation: 'Kata "anomalous" berarti menyimpang dari pola umum atau standar sejarah pada masanya — padanan terdekatnya adalah "atypical" (tidak lazim / tidak tipikal).'
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
        explanation: 'Penulis menyebutkan jam katedral Eropa abad ke-14 untuk menegaskan betapa majunya mekanisme Antikythera: teknologi roda gigi serumit itu baru bisa dibuat kembali oleh manusia lebih dari seribu tahun kemudian.'
      }
    ]
  }
];

/**
 * FLUENCY & LISTENING STUDIO — TOEFL LISTENING SIMULATOR
 * Pembahasan, analisis intonasi, dan idiom dalam Bahasa Indonesia
 */
const FLUENCY_LISTENING_SIMULATOR = [
  {
    id: 'lsim-1',
    partType: 'Part A • Short Dialogue',
    focusCategory: 'Idiomatic Expressions & Implied Meaning',
    title: 'Peralatan Lab & Pengajuan Dana Hibah',
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
    idiomSpotlight: '"Put (something) on the back burner" — Mengesampingkan atau menunda sementara suatu rencana/prioritas hingga waktu yang akan datang.',
    toneNotes: 'Perhatikan kalimat tanya bergema pembicara wanita ("Approve it?") dengan intonasi naik-turun yang menunjukkan ketidakpercayaan, yang menandakan pembalikan makna menjadi penolakan/penundaan.',
    explanation: 'Ketika wanita tersebut mengatakan dekan menyuruh mereka "put the whole proposal on the back burner until next fiscal year", maksudnya pengajuan dana tersebut ditunda pembahasannya sampai tahun anggaran berikutnya.'
  },
  {
    id: 'lsim-2',
    partType: 'Part A • Short Dialogue',
    focusCategory: 'Implied Meaning & Second-Order Wish',
    title: 'Presentasi Seminar Pascasarjana',
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
    idiomSpotlight: '"Cram (something) into" — Memaksakan terlalu banyak isi ke dalam wadah atau durasi waktu yang sangat sempit; "If only I hadn’t..." menyatakan penyesalan atas peristiwa yang sebenarnya telah terjadi.',
    toneNotes: 'Intonasi menghela napas turun pada frasa "If only I hadn’t..." menandakan nada evaluasi diri dan penyesalan: pembicara memang memasukkan 15 tabel sehingga presentasinya menjadi terlalu padat dan terburu-buru.',
    explanation: '"If only I hadn’t tried to cram..." mengindikasikan bahwa pembicara memasukkan terlalu banyak data (15 tabel) ke dalam waktu singkat (10 menit) dan menyesal karena presentasinya menjadi kurang optimal.'
  },
  {
    id: 'lsim-3',
    partType: 'Part C • Academic Lecture',
    focusCategory: 'Academic Tone & Rhetorical Signposting',
    title: 'Kuliah Geomorfologi: Danau Termokarst Permafrost',
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
    idiomSpotlight: '"Here is the catch" — Penanda wacana lisan akademis yang digunakan untuk mengumumkan adanya komplikasi penting, kekurangan tersembunyi, atau dampak berbahaya yang tidak terduga.',
    toneNotes: 'Dosen beralih dari pemaparan deskriptif ke nada peringatan tegas saat mengucapkan "Here is the catch" untuk menarik perhatian mahasiswa terhadap bahaya pelepasan gas metana.',
    explanation: 'Frasa "Here is the catch" menandakan komplikasi kritis: terbentuknya danau termokarst bukan hanya fenomena air mencair biasa, melainkan memicu mikroba anaerobik melepaskan gas metana berbahaya ke atmosfer.'
  },
  {
    id: 'lsim-4',
    partType: 'Part C • Academic Lecture',
    focusCategory: 'Academic Tone & Conceptual Contrast',
    title: 'Ekonomi Perilaku: Fenomena Endowment Effect',
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
    idiomSpotlight: '"Part with (something)" — Merelakan atau melepaskan kepemilikan suatu benda; "Defy that symmetry" — Bertentangan dengan keseimbangan teoretis yang diasumsikan.',
    toneNotes: 'Dengan membandingkan teori neoklasik ("According to standard... theory") dengan fakta lapangan ("In practice, however, human decision-makers stubbornly defy that symmetry"), dosen menggarisbawahi keterbatasan teori klasik bila dihadapkan pada psikologi manusia nyata.',
    explanation: 'Dosen memandang bahwa asumsi simetri dalam teori neoklasik dibantah oleh bukti eksperimen nyata (mahasiswa meminta harga jual 2x lipat lebih tinggi karena rasa berat kehilangan barang miliknya).'
  }
];

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
 * 15 Soal dengan pembahasan lengkap dalam Bahasa Indonesia
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
    explanation: 'Ungkapan "So did I" menunjukkan bahwa pria tersebut tadinya juga mengira batas waktunya hari Jumat, tetapi memo ketua departemen yang "memperpanjangnya sepuluh hari" (extending it by ten days) berarti peserta memiliki tambahan waktu pengumpulan.'
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
    explanation: 'Kata seru "Hardly!" berfungsi sebagai penolakan tegas (sama sekali belum/tidak berhasil), yang diperjelas dengan alasan adanya antrean dua puluh mahasiswa di depan pintu kantor dosen tersebut.'
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
    explanation: 'Bentuk inversi pengandaian lampau "Had I known... I wouldn’t have registered" bermakna bahwa pria tersebut pada kenyataannya tidak mengetahui syarat wajib Aljabar Linear ketika ia mendaftar mata kuliah tersebut.'
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
    explanation: 'Ketika frasa pembatas waktu negatif "Not until [keterangan waktu]" diletakkan di awal kalimat, susunan klausa utama wajib dibalik (inversi: kata kerja bantu "did" + subjek "epidemiologists" + kata kerja dasar "demonstrate").'
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
    explanation: 'Setelah kata kerja yang menyatakan mandat atau keharusan ("mandated that..."), tata bahasa resmi mensyaratkan penggunaan bentuk kata kerja subjungtif berupa bare infinitive ("be retrofitted", tanpa is/was/to).'
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
    explanation: 'Kata penghubung "What" berfungsi ganda: sebagai subjek bagi kata kerja "triggers" di dalam klausa nomina, sekaligus mengantarkan seluruh klausa nomina yang menjadi subjek bagi predikat utama kalimat "remains".'
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
    explanation: 'Untuk memodifikasi kata kerja bentuk lampau/participle "used", diperlukan kata keterangan cara (adverb: "widely"), bukan kata sifat "[C] wide".'
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
    explanation: 'Perbandingan Tidak Logis (Illogical Comparison): Resonansi akustik ("The acoustic resonance") tidak dapat dibandingkan langsung dengan benda alat musik. Hal yang dibandingkan harus berupa resonansinya: "that of a modern factory-made instrument".'
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
    explanation: 'Subjek utama kalimat adalah kata benda tunggal "enforcement" (bukan "caps" atau "lanes" yang ada di dalam frasa preposisi). Oleh karena itu, kata kerja bantu jamak "[B] have led" salah dan harus diganti menjadi kata kerja tunggal "has led".'
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
    explanation: 'Kata penentu "Another" hanya boleh dipasangkan dengan kata benda tunggal yang dapat dihitung. Karena kata benda "arachnids" berbentuk jamak, maka "[A] another" harus diganti menjadi "other".'
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
    explanation: 'Karena gelembung udara tersebut tersegel rapat tanpa celah (hermetically sealed) di dalam es gletser purba, sampel gas tersebut tetap murni dan tidak terkontaminasi oleh udara luar ("uncontaminated").'
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
    explanation: 'Kutipan kalimat "As fallen snow accumulates and compacts into porous firn and eventually solid glacial ice" secara eksplisit mendefinisikan firn sebagai fase peralihan salju yang terpadatkan sebelum berubah menjadi es gletser padat.'
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
    explanation: 'Kalimat terakhir teks secara gamblang menyatakan bahwa karena udara atmosfer masih terus berdifusi melalui lapisan pori-pori firn sampai pori-pori tersebut tertutup rapat di kedalaman tanah, gas yang terperangkap pada suatu lapisan usianya selalu lebih muda daripada matriks es di sekitarnya.'
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
    explanation: 'Kata "contiguous" berarti berbatasan langsung atau berdampingan secara geografis — padanan kata yang paling tepat adalah "adjacent".'
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
    explanation: 'Konsekuensi A, B, dan C secara eksplisit ditulis pada kalimat terakhir teks (lonjakan listrik AC, terhambatnya pemulihan fisiologis di malam hari, dan percepatan ozon). Pilihan D (peningkatan curah hujan dan banjir bandang) sama sekali tidak pernah disebutkan di dalam bacaan.'
  }
];

/**
 * =========================================================================
 * MATERI DAN TIPS TRIK LENGKAP PENINGKATAN SKOR TOEFL ITP (ROAD TO 600+)
 * Modul pembelajaran komprehensif dalam Bahasa Indonesia
 * =========================================================================
 */
const TOEFL_MATERI_DATA = {
  blueprint: {
    id: "blueprint",
    title: "🎯 Blueprint & Strategi Menuju 600+",
    subtitle: "Peta jalan konversi skor resmi, alokasi waktu per detik, dan teknik eliminasi jawaban jebakan.",
    modules: [
      {
        title: "1. Formula Skor & Mengapa 'Grammar Carry' Kunci Tercepat",
        badge: "Strategi Inti",
        content: `
          <p>Banyak peserta tes tertahan di skor <strong>480–510</strong> karena memperlakukan semua bagian tes secara sama. Padahal, rumus konversi TOEFL ITP memberi bobot signifikan pada setiap bagian:</p>
          <div class="materi-formula-box">
            <div class="materi-formula-title">Rumus Resmi Konversi Skor TOEFL ITP Level 1:</div>
            <code>Skor Total = ((Scaled Listening + Scaled Structure + Scaled Reading) × 10) ÷ 3</code>
          </div>
          <p>Untuk menembus <strong>skor 600</strong>, berikut target kombinasi soal benar (Raw Score) yang paling realistis:</p>
          <ul class="materi-list">
            <li><strong>Section 1 (Listening):</strong> Minimal <strong>43 dari 50 soal benar</strong> (Scaled: 59).</li>
            <li><strong>Section 2 (Structure & Written Expression):</strong> Minimal <strong>36 dari 40 soal benar</strong> (Scaled: 61). <em>Inilah tambang emas peningkatan skor tercepat!</em></li>
            <li><strong>Section 3 (Reading Comprehension):</strong> Minimal <strong>44 dari 50 soal benar</strong> (Scaled: 60).</li>
          </ul>
          <div class="materi-callout success">
            <strong>💡 Rahasia Strategi 'Grammar Carry':</strong><br/>
            Structure hanya terdiri dari 40 soal dalam 25 menit. Berbeda dengan Listening yang bergantung pada aksen/kecepatan audio dan Reading yang teksnya panjang, kaidah Structure TOEFL bersifat <strong>pasti, terbatas, dan selalu berulang</strong> (60 pola Longman). Menguasai 60 kaidah grammar akan mendongkrak skor Anda dari 497 langsung ke 580–600+ dalam hitungan minggu.
          </div>
        `
      },
      {
        title: "2. Manajemen Waktu Ujian (Pacing per Detik)",
        badge: "Pacing Waktu",
        content: `
          <p>Kegagalan terbesar di TOEFL bukan karena kurang pintar, melainkan kehabisan waktu di akhir tes. Patuhi ritme waktu berikut:</p>
          <div class="materi-table-wrapper">
            <table class="materi-table">
              <thead>
                <tr>
                  <th>Sesi Tes</th>
                  <th>Jumlah Soal</th>
                  <th>Total Waktu</th>
                  <th>Target Waktu per Soal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Listening</strong></td>
                  <td>50 Soal</td>
                  <td>~35 Menit</td>
                  <td><strong>12 Detik</strong> jeda antar-soal (Langsung hitamkan jawaban, jangan melamun!)</td>
                </tr>
                <tr>
                  <td><strong>Structure</strong></td>
                  <td>40 Soal</td>
                  <td>25 Menit</td>
                  <td><strong>37 Detik per soal</strong> (Maksimal 30s untuk Part A, 40s untuk Part B)</td>
                </tr>
                <tr>
                  <td><strong>Reading</strong></td>
                  <td>50 Soal (5 Teks)</td>
                  <td>55 Menit</td>
                  <td><strong>11 Menit per teks</strong> (Membaca teks 3 menit, menjawab 10 soal 8 menit)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="materi-callout warning">
            <strong>⚠️ Golden Rule:</strong> Jangan pernah membiarkan lembar jawaban kosong! TOEFL ITP <em>tidak ada sistem minus</em>. Jika waktu tersisa 30 detik, pilih satu huruf opsi konsisten (misal: B atau C) untuk semua sisa soal.
          </div>
        `
      },
      {
        title: "3. Trik Sakti Eliminasi Opsi Jawaban (The Elimination Method)",
        badge: "Trik Cepat",
        content: `
          <p>Di level 550 ke atas, ETS sengaja membuat 2 opsi yang terlihat sama-sama benar. Gunakan 4 filter eliminasi ini:</p>
          <ul class="materi-list">
            <li><strong>Eliminasi Kata Ekstrem (Reading & Listening):</strong> Pilihan yang memuat kata <em>always, never, completely, impossible, all, only</em> 95% adalah salah. Bahasa akademik ETS menyukai kata tentatif seperti <em>may, often, tends to, largely</em>.</li>
            <li><strong>Eliminasi Bunyi Serupa (Listening Part A):</strong> Jika Anda mendengar kata "department" di audio, jangan pilih opsi yang memuat kata "apartment" atau "depart". Itu distractor bunyi mirip!</li>
            <li><strong>Eliminasi Predikat Ganda / Subjek Hilang (Structure Part A):</strong> Periksa apakah kalimat sudah punya kata kerja utama (Verb). Jika sudah ada dan tidak ada kata hubung (connector), coret semua opsi yang memuat kata kerja baru.</li>
            <li><strong>Eliminasi Opsi Di Luar Teks (Reading):</strong> Pilihan yang tampak logis secara pengetahuan umum, namun faktanya tidak tertulis di teks, PASTI SALAH. Patuhi isi teks 100%.</li>
          </ul>
        `
      }
    ]
  },

  listening: {
    id: "listening",
    title: "🎧 Listening Comprehension — Tips & Trik Rahasia",
    subtitle: "Kuasai Aturan Orang Kedua, Jebakan Bunyi Mirip, dan Penanda Kuliah Akademik.",
    modules: [
      {
        title: "Part A: Aturan Pembicara Kedua (The Second Speaker Rule)",
        badge: "Part A • Soal 1-30",
        content: `
          <p>Dalam 30 soal percakapan pendek Part A, fokuskan <strong>90% konsentrasi Anda pada pembicara kedua</strong>. Pembicara pertama hanya bertindak sebagai pembuka konteks, sedangkan inti pertanyaan dan kunci jawaban selalu diucapkan oleh pembicara kedua.</p>
          <div class="materi-formula-box">
            <code>Pembicara 1: Menanyakan kabar/masalah/pendapat &rarr; Pembicara 2: MEMBERIKAN JAWABAN KUNCI (DIPARAFRASE DI OPSI)</code>
          </div>
          <p><strong>Contoh Nyata:</strong></p>
          <div class="materi-dialogue-card">
            <div><em>Man:</em> "Do you think Professor Adams will postpone the midterm exam?"</div>
            <div><em>Woman:</em> "Not on your life!"</div>
            <div><em>Narrator:</em> "What does the woman mean?"</div>
          </div>
          <p>Jawaban yang benar adalah parafrase dari penolakan tegas wanita tersebut: <em>"The professor will definitely not delay the exam."</em></p>
        `
      },
      {
        title: "Jebakan Bunyi Mirip (Similar Sound Trap)",
        badge: "Jebakan Terbesar",
        content: `
          <p>Pembuat soal TOEFL sengaja menaruh kata-kata yang pengucapannya mirip dengan kata yang terdengar di audio. Peserta yang hanya menangkap bunyi samar akan langsung terkecoh memilih opsi tersebut.</p>
          <div class="materi-table-wrapper">
            <table class="materi-table">
              <thead>
                <tr>
                  <th>Kata di Audio</th>
                  <th>Opsi Jebakan (SALAH)</th>
                  <th>Makna Sebenarnya / Kunci (BENAR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><em>weather</em> (cuaca)</td>
                  <td><em>whether</em> / <em>feather</em></td>
                  <td>Kondisi iklim luar ruangan</td>
                </tr>
                <tr>
                  <td><em>depart</em> (berangkat)</td>
                  <td><em>department</em></td>
                  <td><em>leave</em> / <em>go away</em></td>
                </tr>
                <tr>
                  <td><em>wait</em> (menunggu)</td>
                  <td><em>weight</em></td>
                  <td><em>stay until someone arrives</em></td>
                </tr>
                <tr>
                  <td><em>hardly</em> (hampir tidak)</td>
                  <td><em>hard work</em></td>
                  <td><em>almost not at all</em> (penolakan)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="materi-callout tip">
            <strong>🎯 Tips Master:</strong> Pilihan jawaban yang benar hampir selalu berupa <strong>RESTATEMENT (sinonim)</strong> dengan susunan kata yang berbeda sama sekali dari bunyi rekaman audio!
          </div>
        `
      },
      {
        title: "Daftar 15 Idiom & Phrasal Verb Paling Sering Muncul di TOEFL",
        badge: "Kosakata Wajib",
        content: `
          <p>Pembicara kedua di Part A sangat sering menggunakan ungkapan idiomatik bahasa Inggris Amerika santai. Wajib hafal 15 idiom ini:</p>
          <div class="materi-grid-cards">
            <div class="materi-mini-card">
              <span class="materi-badge-sm">1</span>
              <strong>Put on the back burner</strong>
              <p>Menunda suatu urusan/proyek sampai waktu berikutnya.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">2</span>
              <strong>Call it a day</strong>
              <p>Menyudahi kegiatan atau pekerjaan hari ini karena sudah lelah.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">3</span>
              <strong>See eye to eye</strong>
              <p>Sependapat / setuju sepenuhnya dengan orang lain.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">4</span>
              <strong>Under the weather</strong>
              <p>Sedang kurang enak badan / agak sakit.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">5</span>
              <strong>Hit the books</strong>
              <p>Mulai belajar dengan giat dan intensif.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">6</span>
              <strong>Bite the bullet</strong>
              <p>Memaksa diri menghadapi situasi sulit yang tak terelakkan.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">7</span>
              <strong>Take a rain check</strong>
              <p>Menolak ajakan secara halus untuk diganti di waktu lain.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">8</span>
              <strong>On the tip of my tongue</strong>
              <p>Sudah ingat di kepala tetapi sulit diucapkan seketika.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">9</span>
              <strong>I couldn't agree more</strong>
              <p>SANGAT SETUJU 100% (Bukan tidak setuju!).</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">10</span>
              <strong>Out of the blue</strong>
              <p>Terjadi tiba-tiba tanpa aba-aba sebelumnya.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">11</span>
              <strong>Burn the midnight oil</strong>
              <p>Belajar atau bekerja lembur sampai larut malam.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">12</span>
              <strong>Pass with flying colors</strong>
              <p>Lulus ujian dengan nilai yang sangat memuaskan / gemilang.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">13</span>
              <strong>Over one's head</strong>
              <p>Terlalu sulit untuk dipahami / di luar kemampuan.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">14</span>
              <strong>Spill the beans</strong>
              <p>Membocorkan rahasia tanpa sengaja.</p>
            </div>
            <div class="materi-mini-card">
              <span class="materi-badge-sm">15</span>
              <strong>Cost an arm and a leg</strong>
              <p>Sangat mahal harganya.</p>
            </div>
          </div>
        `
      },
      {
        title: "Part B & C: Trik Membaca Opsi Jawaban Sebelum Audio (Skim-Ahead)",
        badge: "Part B & C • Soal 31-50",
        content: `
          <p>Pada percakapan panjang (Part B) dan kuliah akademik dosen (Part C), Anda tidak boleh hanya pasif mendengarkan. Lakukan <strong>Teknik Skim-Ahead</strong>:</p>
          <ul class="materi-list">
            <li><strong>Manfaatkan Jeda Instruksi Narator:</strong> Ketika narator membaca petunjuk Part B atau Part C selama 60–90 detik, jangan dengarkan petunjuk tersebut! Segera buka halaman soal dan baca kilat opsi jawaban 4 soal pertama (misal: soal 31–34).</li>
            <li><strong>Tebak Topik Pembicaraan:</strong> Dari opsi jawaban, Anda langsung tahu apakah kuliahnya mengenai Astronomi, Biologi Laut, atau Sejarah Amerika. Otak Anda akan bersiap menyerap istilah terkait.</li>
            <li><strong>Fokus pada Kalimat Pertama Dosen:</strong> 95% pertanyaan pertama (<em>What is the main topic of the lecture?</em>) diungkapkan di 2 kalimat pembuka kuliah.</li>
            <li><strong>Perhatikan Penanda Wacana (Signpost Words):</strong>
              <br/>- <em>"However / In contrast"</em>: Dosen akan menyanggah teori lama (sering ditanyakan!).
              <br/>- <em>"Here is the catch"</em>: Dosen menandai adanya kendala/bahaya tersembunyi.
              <br/>- <em>"For example / To illustrate"</em>: Contoh kasus yang pasti ditanyakan di pertanyaan detail.
            </li>
          </ul>
        `
      }
    ]
  },

  structure: {
    id: "structure",
    title: "✍️ Structure & Written Expression — 60 Kaidah Emas Longman",
    subtitle: "Kunci lonjakan skor 600+: Kuasai Inversi, Reduced Clauses, Paralelisme, dan Jebakan S-V Agreement.",
    modules: [
      {
        title: "Kaidah 1: Inversi Subjek dan Kata Kerja (Inversion Mastery)",
        badge: "Kaidah Terbanyak di 600+",
        content: `
          <p>Dalam pola bahasa Inggris normal, urutan kalimat adalah <code>Subject + Verb</code>. Namun dalam TOEFL, susunan kata dibalik menjadi <code>Auxiliary + Subject + Verb</code> pada 3 kondisi utama:</p>
          
          <h4>1. Inversi setelah Kata Negatif / Pembatas di Awal Kalimat</h4>
          <p>Jika kalimat diawali kata: <em>Rarely, Seldom, Never, Scarcely, Barely, Hardly, Only after, Not until, At no time, Nowhere</em>, kalimat WAJIB diinversi:</p>
          <div class="materi-formula-box">
            <code>[Negative Word] + [Auxiliary: do/does/did/is/are/can/have] + [Subject] + [Main Verb]</code>
          </div>
          <p><strong>Contoh Benar:</strong> <em>Rarely <u>are observatories</u> located near city lights.</em><br/>
          <strong>Contoh Salah:</strong> <em>Rarely <u>observatories are</u> located...</em> (Tidak diinversi).</p>

          <h4>2. Inversi Kondisional (Penghilangan Kata 'If')</h4>
          <p>TOEFL sangat suka menghilangkan kata <em>if</em> pada kalimat pengandaian:</p>
          <ul class="materi-list">
            <li><strong>Type 1 (Should):</strong> <em>If you should need assistance &rarr; <strong>Should you need</strong> assistance...</em></li>
            <li><strong>Type 2 (Were):</strong> <em>If the bank were to raise rates &rarr; <strong>Were the bank to raise</strong> rates...</em></li>
            <li><strong>Type 3 (Had):</strong> <em>If I had known the policy &rarr; <strong>Had I known</strong> the policy...</em></li>
          </ul>

          <h4>3. Inversi Frasa Tempat / Arah di Awal Kalimat</h4>
          <p>Jika frasa keterangan tempat diletakkan di awal kalimat tanpa koma: <code>[Place Expression] + [Verb] + [Subject]</code></p>
          <p><strong>Contoh:</strong> <em>In the valley <u>stood a historic fortress</u>.</em> (Bukan <em>In the valley a fortress stood</em>).</p>
        `
      },
      {
        title: "Kaidah 2: Reduced Clauses (Klausa yang Disederhanakan)",
        badge: "Paling Sering Mengecoh",
        content: `
          <p>Klausa sifat (Adjective Clause) dan klausa keterangan (Adverb Clause) sering disederhanakan dengan menghilangkan subjek dan to-be:</p>
          <div class="materi-table-wrapper">
            <table class="materi-table">
              <thead>
                <tr>
                  <th>Bentuk Asli (Full Clause)</th>
                  <th>Bentuk Reduksi (TOEFL)</th>
                  <th>Kaidah Bentuk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>The scientist <em>who is conducting</em> the study...</td>
                  <td>The scientist <strong>conducting</strong> the study...</td>
                  <td><strong>Participle Aktif (-ing)</strong></td>
                </tr>
                <tr>
                  <td>The data <em>which was presented</em> in the report...</td>
                  <td>The data <strong>presented</strong> in the report...</td>
                  <td><strong>Participle Pasif (V-3 / -ed)</strong></td>
                </tr>
                <tr>
                  <td><em>Although he was</em> exhausted, he continued...</td>
                  <td><em>Although</em> <strong>exhausted</strong>, he continued...</td>
                  <td><strong>Adverb Clause Pasif</strong></td>
                </tr>
                <tr>
                  <td><em>Before he submitted</em> the paper...</td>
                  <td><em>Before</em> <strong>submitting</strong> the paper...</td>
                  <td><strong>Adverb Clause Aktif</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="materi-callout warning">
            <strong>⚠️ Jebakan Mematikan TOEFL:</strong><br/>
            Banyak peserta mengira kata berakhiran <em>-ed</em> (seperti <em>presented, published, designed</em>) adalah kata kerja utama (Verb)! Padahal itu hanyalah <strong>participle penjelas benda</strong>. Pastikan kalimat tetap memiliki Verb utama (Finite Verb) yang utuh!
          </div>
        `
      },
      {
        title: "Kaidah 3: Parallel Structure (Kesejajaran Struktur)",
        badge: "Soal Error Recognition",
        content: `
          <p>Di Section 2 Part B (Error Recognition), salah satu kesalahan paling umum adalah ketidaksejajaran struktur gramatikal.</p>

          <h4>1. Konjungsi Koordinatif (and, but, or)</h4>
          <p>Kata di sebelum dan sesudah <em>and/but/or</em> harus memiliki kelas kata yang sama persis: <code>Noun and Noun</code>, <code>Adjective and Adjective</code>, <code>Gerund and Gerund</code>.</p>

          <h4>2. Konjungsi Berpasangan (Correlative Conjunctions)</h4>
          <p>Wajib hafal pasangan resminya (tidak boleh tertukar!):</p>
          <ul class="materi-list">
            <li><strong>both ... and ...</strong></li>
            <li><strong>either ... or ...</strong></li>
            <li><strong>neither ... nor ...</strong></li>
            <li><strong>not only ... but also ...</strong></li>
          </ul>
          <p><em>Kaidah:</em> Jika setelah <em>not only</em> berbentuk frasa preposisi (<em>for its speed</em>), maka setelah <em>but also</em> WAJIB berbentuk frasa preposisi (<em>for its accuracy</em>), BUKAN anak kalimat (<em>because it is accurate</em>)!</p>

          <h4>3. Perbandingan Tidak Logis (Illogical Comparison)</h4>
          <p>Anda tidak boleh membandingkan dua hal yang berbeda jenis!</p>
          <p>❌ <em>The climate of Jakarta is hotter than Bandung.</em> (Salah: membandingkan iklim dengan kota).<br/>
          ✔️ <em>The climate of Jakarta is hotter than <strong>that of</strong> Bandung.</em> (Gunakan <strong>that of</strong> untuk benda tunggal, <strong>those of</strong> untuk benda jamak).</p>
        `
      },
      {
        title: "Kaidah 4: Subject-Verb Agreement & Penyekat Preposisi",
        badge: "Paling Banyak Keluar",
        content: `
          <p>Dalam soal TOEFL tingkat mahir, ETS sengaja memisahkan Subjek asli dan Kata Kerjanya dengan frasa penyekat yang panjang agar Anda terkecoh.</p>
          <div class="materi-formula-box">
            <code>[SUBJEK TUNGGAL] + [of / with / across / in / for ... frasa benda jamak ...] + [VERB TUNGGAL]</code>
          </div>
          <p><strong>Contoh Soal:</strong><br/>
          <em>The <strong>enforcement</strong> <u>of sulfur emission caps across international shipping lanes</u> <strong>has led</strong> (bukan have led) to lower pollution.</em></p>
          <p>Kata benda yang berada di dalam tanda preposisi (<em>caps, lanes</em>) adalah <strong>Objek Preposisi</strong>, BUKAN Subjek kalimat! Subjeknya adalah <em>enforcement</em> (tunggal), maka kata kerjanya wajib <em>has</em>.</p>
          
          <div class="materi-callout tip">
            <strong>🎯 Indefinite Pronouns Selalu Diikuti Verb Tunggal:</strong><br/>
            Kata-kata seperti <em>Everyone, Everybody, Someone, Anyone, Nobody, Each, Either, Neither</em> SELALU dianggap tunggal (Singular Verb: <em>is, was, has, does, V-s</em>).
          </div>
        `
      },
      {
        title: "Kaidah 5: Subjunctive Mood (Bentuk Kata Kerja Subjungtif)",
        badge: "Kaidah Level 550+",
        content: `
          <p>Ketika kalimat menggunakan kata kerja yang menyatakan tuntutan, rekomendasi, mandat, atau keharusan formal yang diikuti kata <em>that</em>:</p>
          <p><strong>Daftar Kata Kerja Pemicu:</strong> <em>demand that, insist that, require that, recommend that, suggest that, mandate that, propose that, urge that</em>.</p>
          <div class="materi-formula-box">
            <code>[Subject 1] + [Verb of Demand] + that + [Subject 2] + [BARE INFINITIVE (V-1 Asli / be)]</code>
          </div>
          <p>Kata kerja setelah <em>that</em> <strong>TIDAK BOLEH</strong> diberi akhiran -s, -es, -ed, atau diubah menjadi is/was, bahkan jika subjeknya he/she/it!</p>
          <p><strong>Contoh Benar:</strong> <em>The board mandated that every aircraft <strong>be</strong> retrofitted.</em> (Bukan <em>is</em> atau <em>was</em>).<br/>
          <strong>Contoh Benar:</strong> <em>The professor suggested that she <strong>take</strong> the exam.</em> (Bukan <em>takes</em>).</p>
        `
      }
    ]
  },

  reading: {
    id: "reading",
    title: "📖 Reading Comprehension — Masterclass Membedah Teks Akademik",
    subtitle: "Trik membaca 11 menit per teks: Kuasai Skimming, Scanning, dan Cara Membedah 5 Jenis Soal.",
    modules: [
      {
        title: "Strategi 11 Menit per Teks (Skimming & Scanning Protocol)",
        badge: "Manajemen Waktu",
        content: `
          <p>Sesi Reading terdiri dari 5 teks panjang dengan masing-masing 9–11 pertanyaan (total 50 soal dalam 55 menit). Alokasi maksimal adalah <strong>11 menit per teks</strong>.</p>
          <ul class="materi-list">
            <li><strong>Langkah 1 (Menit 0–2): Skimming Struktur Teks</strong><br/>
            Jangan membaca kata demi kata dari awal sampai akhir! Bacalah hanya:
            <br/>• 2 kalimat pertama paragraf 1 (Topik utama teks).
            <br/>• Kalimat pertama setiap paragraf lanjutan (Ide pokok paragraf).
            <br/>• Kalimat terakhir paragraf penutup (Kesimpulan).
            <br/>Dalam 2 menit, Anda sudah punya 'peta mental' isi teks.</li>
            <li><strong>Langkah 2 (Menit 2–10): Scanning Terarah Sesuai Soal</strong><br/>
            Lihat nomor baris yang dirujuk pada soal (misal: <em>in line 7</em>). Segera arahkan pandangan mata langsung ke baris tersebut tanpa membaca ulang seluruh halaman.</li>
            <li><strong>Langkah 3 (Menit 10–11): Periksa Jawaban & Pindah Teks</strong><br/>
            Jangan habiskan lebih dari 1 menit untuk 1 soal sulit. Beri tanda, pilih jawaban tebakan terbaik, dan segera lanjut ke teks berikutnya.</li>
          </ul>
        `
      },
      {
        title: "Cara Menjawab 5 Tipe Soal Reading TOEFL Paling Populer",
        badge: "Taktik Soal",
        content: `
          <h4>1. Main Idea / Primary Purpose Questions</h4>
          <p><em>Bentuk Soal:</em> "What is the main idea of the passage?" / "What is the author's primary purpose?"</p>
          <p><strong>Trik Cepat:</strong> Jawaban ada di kalimat 1–2 paragraf pertama. Coret pilihan yang <em>too narrow</em> (hanya membahas rincian satu paragraf) atau <em>too broad</em> (terlalu luas melebihi topik teks).</p>

          <h4>2. Stated Detail Questions ("According to the passage...")</h4>
          <p><em>Bentuk Soal:</em> "According to lines 12–15, how do adjacent pines react...?"</p>
          <p><strong>Trik Cepat:</strong> Temukan kata kunci soal di teks. Baca 1 kalimat sebelum dan 1 kalimat sesudahnya. Pilihan jawaban yang benar adalah <strong>PARAFRASE</strong> (artinya sama persis, tetapi kosakatanya diganti sinonim).</p>

          <h4>3. Unstated / Negative Detail Questions (EXCEPT / NOT Mentioned)</h4>
          <p><em>Bentuk Soal:</em> "All of the following are mentioned EXCEPT..." / "Which is NOT true?"</p>
          <p><strong>Trik Cepat:</strong> Cari 3 pilihan yang BENAR dan tertulis di dalam teks, lalu coret (eliminasi). Pilihan yang tersisa (yang tidak disebutkan atau bertentangan) adalah kunci jawabannya!</p>

          <h4>4. Vocabulary in Context ("closest in meaning to...")</h4>
          <p><em>Bentuk Soal:</em> "The word 'pristine' in line 5 is closest in meaning to..."</p>
          <p><strong>Trik Cepat:</strong> JANGAN langsung memilih arti kamus yang paling umum! Masukkan pilihan jawaban ke dalam kalimat di baris tersebut. Cari petunjuk konteks seperti tanda koma ganda (<em>appositive</em>), tanda hubung (<em>dash</em>), atau kata pertentangan (<em>whereas, but, although</em>).</p>

          <h4>5. Inference Questions ("It can be inferred that...", "implies...")</h4>
          <p><em>Bentuk Soal:</em> "What can be inferred from lines 15–18 about the fungi...?"</p>
          <p><strong>Trik Cepat:</strong> Jawaban adalah kesimpulan logis satu langkah ke depan yang didukung fakta kalimat. <em>Peringatan keras:</em> Jangan berimajinasi atau menggunakan opini pribadi di luar teks!</p>
        `
      },
      {
        title: "Daftar 20 Kosakata Akademik (AWL) Paling Sering Diuji di TOEFL Reading",
        badge: "High-Yield AWL",
        content: `
          <p>ETS mengambil bacaan dari jurnal akademik Amerika. Wajib kuasai 20 kata Academic Word List (AWL) beserta sinonim TOEFL-nya berikut:</p>
          <div class="materi-table-wrapper">
            <table class="materi-table">
              <thead>
                <tr>
                  <th>Kata Akademik</th>
                  <th>Sinonim TOEFL Resmi</th>
                  <th>Arti dalam Bahasa Indonesia</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><strong>Facilitate</strong></td><td>Expedite / Promote / Make easier</td><td>Mempermudah / memperlancar proses</td></tr>
                <tr><td><strong>Predominantly</strong></td><td>Chiefly / Primarily / Mainly</td><td>Terutama / secara dominan</td></tr>
                <tr><td><strong>Subsidize</strong></td><td>Support / Fund / Supplement</td><td>Menyokong bantuan dana / nutrisi</td></tr>
                <tr><td><strong>Allocation</strong></td><td>Distribution / Allotment</td><td>Alokasi / pembagian sumber daya</td></tr>
                <tr><td><strong>Adjacent</strong></td><td>Neighboring / Contiguous / Bordering</td><td>Bersebelahan / berdampingan erat</td></tr>
                <tr><td><strong>Anomalous</strong></td><td>Atypical / Irregular / Aberrant</td><td>Menyimpang / tidak lazim / anomali</td></tr>
                <tr><td><strong>Postulate</strong></td><td>Hypothesize / Posit / Propose</td><td>Mendalilkan / mempostulatkan hipotesis</td></tr>
                <tr><td><strong>Pristine</strong></td><td>Uncontaminated / Pure / Unspoiled</td><td>Murni / belum terkontaminasi</td></tr>
                <tr><td><strong>Contiguous</strong></td><td>Adjacent / Touching / Bordering</td><td>Berbatasan langsung / bersambungan</td></tr>
                <tr><td><strong>Volatile</strong></td><td>Unstable / Explosive / Changeable</td><td>Mudah berubah / bergejolak tidak stabil</td></tr>
                <tr><td><strong>Scrutinize</strong></td><td>Examine closely / Inspect</td><td>Memeriksa secara cermat dan mendalam</td></tr>
                <tr><td><strong>Pervasive</strong></td><td>Widespread / Prevalent / Ubiquitous</td><td>Tersebar luas ke mana-mana</td></tr>
                <tr><td><strong>Deterrent</strong></td><td>Obstacle / Hindrance / Prevention</td><td>Penghalang / pencegah / perintang</td></tr>
                <tr><td><strong>Impervious</strong></td><td>Impermeable / Resistant</td><td>Kedap / tidak dapat ditembus air/gas</td></tr>
                <tr><td><strong>Disparity</strong></td><td>Difference / Inequality / Inconsistency</td><td>Kesenjangan / disparitas perbedaan</td></tr>
                <tr><td><strong>Subsequent</strong></td><td>Following / Later / Successive</td><td>Berikutnya / yang terjadi sesudahnya</td></tr>
                <tr><td><strong>Fluctuate</strong></td><td>Vary irregularly / Oscillate</td><td>Naik-turun / berfluktuasi tidak teratur</td></tr>
                <tr><td><strong>Plausible</strong></td><td>Believable / Credible / Feasible</td><td>Masuk akal / dapat dipercaya</td></tr>
                <tr><td><strong>Ubiquitous</strong></td><td>Omnipresent / Ever-present</td><td>Ada di mana-mana pada saat bersamaan</td></tr>
                <tr><td><strong>Endeavor</strong></td><td>Attempt / Effort / Undertaking</td><td>Upaya keras / usaha sungguh-sungguh</td></tr>
              </tbody>
            </table>
          </div>
        `
      }
    ]
  }
};
