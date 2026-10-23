/**
 * RoadTo600: TOEFL ITP & Fluency Mastery — Main Application Controller
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'roadTo600_pwa_state_v2';
  const ERROR_LOG_KEY = 'error_log'; // Exact localStorage key required for Smart Error Log
  const BASELINE_SCORE = 497;
  const TARGET_SCORE = 600;

  // =========================================================================
  // 1. EXACT TOEFL ITP SCORING ENGINE
  // =========================================================================

  function getScaledListening(raw) {
    const idx = Math.max(0, Math.min(50, Math.round(Number(raw) || 0)));
    return LISTENING_RAW_TO_SCALED[idx];
  }

  function getScaledStructure(raw) {
    const idx = Math.max(0, Math.min(40, Math.round(Number(raw) || 0)));
    return STRUCTURE_RAW_TO_SCALED[idx];
  }

  function getScaledReading(raw) {
    const idx = Math.max(0, Math.min(50, Math.round(Number(raw) || 0)));
    return READING_RAW_TO_SCALED[idx];
  }

  /**
   * Exact TOEFL ITP Final Score Formula:
   * Math.round(((Scaled_Listening + Scaled_Structure + Scaled_Reading) * 10) / 3)
   */
  function calculateToeflItpScore(rawL, rawS, rawR) {
    const scaledL = getScaledListening(rawL);
    const scaledS = getScaledStructure(rawS);
    const scaledR = getScaledReading(rawR);
    const finalScore = Math.round(((scaledL + scaledS + scaledR) * 10) / 3);
    return {
      rawL: Number(rawL),
      rawS: Number(rawS),
      rawR: Number(rawR),
      scaledL,
      scaledS,
      scaledR,
      finalScore
    };
  }

  // =========================================================================
  // 2. STATE & SMART ERROR LOG (`localStorage.error_log`) MANAGEMENT
  // =========================================================================

  function getTodayDateString() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getYesterdayDateString() {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function getDefaultSkillStats() {
    // Pre-seeded baseline accuracy stats from the user's 497 diagnostic so skill accuracy is meaningful immediately
    return {
      'Skill 15: Inversion with Negative Expressions': { attempts: 5, correct: 2 }, // 40% accuracy
      'Skill 25: Parallel Structure with Comparisons': { attempts: 4, correct: 2 }, // 50% accuracy
      'Skill 13: Reduced Adjective Clauses': { attempts: 5, correct: 3 }, // 60% accuracy
      'Skill 20: Subject-Verb Agreement after Prepositional Phrases': { attempts: 5, correct: 2 } // 40% accuracy
    };
  }

  function loadErrorLog() {
    try {
      const raw = localStorage.getItem(ERROR_LOG_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      // Fallback below
    }
    // Seed initial error_log with 2 representative weak questions from the 497 baseline diagnostic
    // so the Review (Weakness Log) tab demonstrates grouping & accuracy out of the box
    const initialErrors = [
      Object.assign({}, SEED_STRUCTURE_QUESTIONS[0], {
        wrongAnswerIndex: 0,
        loggedAt: new Date().toISOString()
      }),
      Object.assign({}, SEED_STRUCTURE_QUESTIONS[3], {
        wrongAnswerIndex: 3,
        loggedAt: new Date().toISOString()
      })
    ];
    try {
      localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(initialErrors));
    } catch (e) {}
    return initialErrors;
  }

  function saveErrorLog(errorLogArray) {
    try {
      localStorage.setItem(ERROR_LOG_KEY, JSON.stringify(errorLogArray));
    } catch (err) {}
  }

  function getDefaultState() {
    return {
      // Injected Seed Database
      questionsDatabase: SEED_STRUCTURE_QUESTIONS.slice(),
      // Current Estimated Score (starts at Baseline 497: L:29[50], S:25[49], R:32[50])
      estimatedScore: 497,
      estimatedBreakdown: { scaledL: 50, scaledS: 49, scaledR: 50 },
      // Simulator Sliders (Initialized to 600 Target blueprint: L:43[59], S:36[61], R:44[60])
      simRawL: 43,
      simRawS: 36,
      simRawR: 44,
      // Daily 45-Minute Habit Tracker & Streak
      streakDays: 1,
      lastHabitDate: getTodayDateString(),
      streakIncrementedToday: false,
      habitsCompleted: {
        habit_structure: false,
        habit_reading: false,
        habit_fluency: false
      },
      // Drills State
      currentStructureIndex: 0,
      structureAnswers: {},
      currentPassageIndex: 0,
      readingLayoutMode: window.innerWidth < 860 ? 'passage' : 'split',
      readingAnswers: {},
      activeAwlWord: null,
      // Saved AWL Vocabulary Flashcard Deck
      savedVocabularyDeck: [
        {
          id: 'awl-facilitate',
          word: 'facilitate',
          partOfSpeech: 'verb',
          phonetic: '/fəˈsɪl.ɪ.teɪt/',
          lineRef: 'Line 5',
          toeflSynonym: 'expedite / make possible / promote',
          meaning: 'To make an action or biological process easier or more achievable.',
          contextQuote: '...these microscopic hyphal conduits facilitate the bidirectional transfer of carbon...',
          mastered: false
        },
        {
          id: 'awl-predominantly',
          word: 'predominantly',
          partOfSpeech: 'adverb',
          phonetic: '/prɪˈdɒm.ɪ.nənt.li/',
          lineRef: 'Line 7',
          toeflSynonym: 'chiefly / primarily / mainly',
          meaning: 'Mainly; representing the strongest or most frequent element.',
          contextQuote: 'Whereas classical forest ecology predominantly emphasized competition...',
          mastered: false
        }
      ],
      currentVocabCardIndex: 0,
      vocabCardFlipped: false,
      // Skill Accuracy Statistics
      skillStats: getDefaultSkillStats(),
      // Fluency State
      currentFluencyIndex: 0
    };
  }

  let errorLog = loadErrorLog();
  let state = loadState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return getDefaultState();
      const parsed = JSON.parse(raw);
      const merged = Object.assign(getDefaultState(), parsed);
      merged.questionsDatabase = SEED_STRUCTURE_QUESTIONS.slice();
      merged.habitsCompleted = Object.assign(
        getDefaultState().habitsCompleted,
        parsed.habitsCompleted || {}
      );
      merged.skillStats = Object.assign(
        getDefaultSkillStats(),
        parsed.skillStats || {}
      );
      if (!Array.isArray(merged.savedVocabularyDeck)) {
        merged.savedVocabularyDeck = getDefaultState().savedVocabularyDeck;
      }

      // Check date rollover for Daily Habit Tracker
      const today = getTodayDateString();
      if (merged.lastHabitDate !== today) {
        const yesterday = getYesterdayDateString();
        const completedAllYesterday =
          merged.habitsCompleted.habit_structure &&
          merged.habitsCompleted.habit_reading &&
          merged.habitsCompleted.habit_fluency;

        if (merged.lastHabitDate !== yesterday && !completedAllYesterday) {
          merged.streakDays = Math.max(1, merged.streakDays);
        }
        merged.lastHabitDate = today;
        merged.streakIncrementedToday = false;
        merged.habitsCompleted = {
          habit_structure: false,
          habit_reading: false,
          habit_fluency: false
        };
      }
      return merged;
    } catch (err) {
      return getDefaultState();
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {}
  }

  /**
   * Record any question attempt into skillStats and, if answered incorrectly,
   * automatically save the full question object into localStorage under `error_log`.
   */
  function recordQuestionAttempt(questionObj, chosenIndex) {
    const isCorrect = chosenIndex === questionObj.correctIndex;
    const skillName = questionObj.skill || questionObj.section || 'General TOEFL Skill';

    if (!state.skillStats[skillName]) {
      state.skillStats[skillName] = { attempts: 0, correct: 0 };
    }
    state.skillStats[skillName].attempts += 1;
    if (isCorrect) {
      state.skillStats[skillName].correct += 1;
    }

    if (!isCorrect) {
      // Save or update question object in `error_log`
      const existingIdx = errorLog.findIndex((item) => item.id === questionObj.id);
      const entry = Object.assign({}, questionObj, {
        wrongAnswerIndex: chosenIndex,
        loggedAt: new Date().toISOString()
      });

      if (existingIdx >= 0) {
        errorLog[existingIdx] = entry;
      } else {
        errorLog.unshift(entry);
      }
      saveErrorLog(errorLog);
      showToast(`🚨 Saved to Smart Error Log (${skillName})`);
    }

    saveState();
    updateReviewBadges();
  }

  // =========================================================================
  // 3. TOAST HELPER
  // =========================================================================

  let toastTimeout = null;
  function showToast(message) {
    const el = document.getElementById('toast-notification');
    if (!el) return;
    el.textContent = message;
    el.classList.add('visible');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      el.classList.remove('visible');
    }, 3100);
  }

  // =========================================================================
  // 4. NAVIGATION CONTROLLER (5 Tabs: Home, Drills, Simulasi, Fluency, Review)
  // =========================================================================

  function switchTab(tabName) {
    document.querySelectorAll('.tab-view').forEach((sec) => {
      sec.classList.toggle('active', sec.id === `view-${tabName}`);
    });
    document.querySelectorAll('[data-nav-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-nav-tab') === tabName);
    });
    if (tabName === 'review') {
      renderReviewTab();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function initNavigation() {
    document.querySelectorAll('[data-nav-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-nav-tab');
        switchTab(target);
      });
    });
  }

  // =========================================================================
  // 5. MODULE 1.1: SCORE TRAJECTORY HEADER
  // =========================================================================

  function renderScoreTrajectoryHeader() {
    const current = state.estimatedScore;
    const pointsLeft = Math.max(0, TARGET_SCORE - current);
    const pointsGained = current - BASELINE_SCORE;

    const span = TARGET_SCORE - BASELINE_SCORE; // 103 points
    const rawPct = ((current - BASELINE_SCORE) / span) * 100;
    const clampedPct = Math.max(4, Math.min(100, Math.round(rawPct)));

    const elCurrent = document.getElementById('header-current-score');
    const elBreakdown = document.getElementById('header-current-breakdown');
    const elCard = document.getElementById('current-score-card');
    const elGainText = document.getElementById('trajectory-gain-text');
    const elPointsLeft = document.getElementById('points-left-badge');
    const elFill = document.getElementById('trajectory-progress-fill');
    const elProgressbar = document.getElementById('trajectory-progressbar');
    const elMobileEst = document.getElementById('mobile-est-score');
    const elSidebarBadge = document.getElementById('sidebar-score-badge');

    if (elCurrent) elCurrent.textContent = current;
    if (elMobileEst) elMobileEst.textContent = current;
    if (elSidebarBadge) elSidebarBadge.textContent = `${current}→600`;

    if (elBreakdown && state.estimatedBreakdown) {
      const { scaledL, scaledS, scaledR } = state.estimatedBreakdown;
      elBreakdown.textContent = `L:${scaledL} • S:${scaledS} • R:${scaledR}`;
    }

    if (elCard) {
      elCard.classList.toggle('goal-reached', current >= TARGET_SCORE);
    }

    if (elGainText) {
      elGainText.textContent =
        pointsGained >= 0
          ? `+${pointsGained} pts gained from ${BASELINE_SCORE} baseline`
          : `${pointsGained} pts vs ${BASELINE_SCORE} baseline`;
    }

    if (elPointsLeft) {
      if (pointsLeft === 0) {
        elPointsLeft.textContent = `🎉 600+ Target Achieved! (+${current - TARGET_SCORE} above 600)`;
        elPointsLeft.classList.add('achieved');
      } else {
        elPointsLeft.textContent = `${pointsLeft} points left to 600`;
        elPointsLeft.classList.remove('achieved');
      }
    }

    if (elFill) elFill.style.width = `${clampedPct}%`;
    if (elProgressbar) elProgressbar.setAttribute('aria-valuenow', String(current));
  }

  // =========================================================================
  // 6. MODULE 1.2: INTERACTIVE TOEFL ITP SCORE CONVERTER & ESTIMATOR
  // =========================================================================

  function renderPresets() {
    const container = document.getElementById('score-presets-container');
    if (!container) return;
    container.innerHTML = '';

    SCORE_PRESETS.forEach((preset) => {
      const isMatch =
        state.simRawL === preset.rawL &&
        state.simRawS === preset.rawS &&
        state.simRawR === preset.rawR;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `preset-chip ${isMatch ? 'active' : ''}`;
      btn.textContent = `${preset.label} • ${preset.badge}`;
      btn.title = preset.description;
      btn.addEventListener('click', () => {
        state.simRawL = preset.rawL;
        state.simRawS = preset.rawS;
        state.simRawR = preset.rawR;
        saveState();
        syncCalculatorInputs();
        updateScoreCalculatorUI();
        renderPresets();
      });
      container.appendChild(btn);
    });
  }

  function syncCalculatorInputs() {
    const sL = document.getElementById('slider-listening');
    const sS = document.getElementById('slider-structure');
    const sR = document.getElementById('slider-reading');
    if (sL) sL.value = state.simRawL;
    if (sS) sS.value = state.simRawS;
    if (sR) sR.value = state.simRawR;
  }

  function updateScoreCalculatorUI() {
    const result = calculateToeflItpScore(state.simRawL, state.simRawS, state.simRawR);

    document.getElementById('val-raw-l').textContent = result.rawL;
    document.getElementById('val-scaled-l').textContent = result.scaledL;
    document.getElementById('val-raw-s').textContent = result.rawS;
    document.getElementById('val-scaled-s').textContent = result.scaledS;
    document.getElementById('val-raw-r').textContent = result.rawR;
    document.getElementById('val-scaled-r').textContent = result.scaledR;

    const bigScoreEl = document.getElementById('sim-total-score');
    const eqLineEl = document.getElementById('sim-equation-line');
    const formulaMathEl = document.getElementById('sim-formula-math');
    const adviceEl = document.getElementById('sim-target-advice');

    if (bigScoreEl) {
      bigScoreEl.textContent = result.finalScore;
      bigScoreEl.classList.toggle('hit-600', result.finalScore >= TARGET_SCORE);
    }

    if (eqLineEl) {
      eqLineEl.textContent = `L: ${result.rawL}/50 [${result.scaledL}] • S: ${result.rawS}/40 [${result.scaledS}] • R: ${result.rawR}/50 [${result.scaledR}] ⇒ Total: ${result.finalScore}`;
    }

    if (formulaMathEl) {
      formulaMathEl.textContent = `Math.round(((${result.scaledL} + ${result.scaledS} + ${result.scaledR}) * 10) / 3) = ${result.finalScore}`;
    }

    if (adviceEl) {
      const diffTo600 = TARGET_SCORE - result.finalScore;
      const sumScaledNeeded = 180 - (result.scaledL + result.scaledS + result.scaledR);
      if (diffTo600 <= 0) {
        adviceEl.className = 'calc-status-banner success';
        adviceEl.textContent = `✅ Target 600+ Achieved (${result.finalScore})! Margin of error: ${50 - result.rawL} in Listening, ${40 - result.rawS} in Structure, ${50 - result.rawR} in Reading.`;
      } else {
        adviceEl.className = 'calc-status-banner';
        adviceEl.textContent = `🎯 ${diffTo600} points short of 600. You need +${Math.max(1, sumScaledNeeded)} more scaled points across sections (try raising Structure to 36/40 [61]).`;
      }
    }
  }

  function applySimulatedScoreToTrajectory() {
    const result = calculateToeflItpScore(state.simRawL, state.simRawS, state.simRawR);
    state.estimatedScore = result.finalScore;
    state.estimatedBreakdown = {
      scaledL: result.scaledL,
      scaledS: result.scaledS,
      scaledR: result.scaledR
    };
    saveState();
    renderScoreTrajectoryHeader();
    showToast(`📊 Trajectory updated! Current Estimated Score set to ${result.finalScore}.`);
  }

  function initScoreCalculator() {
    syncCalculatorInputs();
    renderPresets();
    updateScoreCalculatorUI();

    const sL = document.getElementById('slider-listening');
    const sS = document.getElementById('slider-structure');
    const sR = document.getElementById('slider-reading');

    [
      [sL, 'simRawL'],
      [sS, 'simRawS'],
      [sR, 'simRawR']
    ].forEach(([el, key]) => {
      if (!el) return;
      el.addEventListener('input', (e) => {
        state[key] = Number(e.target.value);
        saveState();
        updateScoreCalculatorUI();
        renderPresets();
      });
    });

    const btnSync = document.getElementById('btn-sync-estimate');
    const btnApply = document.getElementById('btn-apply-to-dashboard');
    if (btnSync) btnSync.addEventListener('click', applySimulatedScoreToTrajectory);
    if (btnApply) btnApply.addEventListener('click', applySimulatedScoreToTrajectory);
  }

  // =========================================================================
  // 7. MODULE 1.3: DAILY 45-MINUTE HABIT TRACKER & FOCUS TIMER
  // =========================================================================

  let focusTimerInterval = null;
  let focusSecondsRemaining = 15 * 60;
  let focusTimerRunning = false;
  let activeHabitForTimer = null;

  function updateStreakBadges() {
    const d = state.streakDays;
    const elHabitStreak = document.getElementById('habit-streak-days');
    const elMobileStreak = document.getElementById('mobile-streak-val');
    const elSidebarStreak = document.getElementById('sidebar-streak-label');
    const elDateDisplay = document.getElementById('habit-date-display');

    if (elHabitStreak) elHabitStreak.textContent = d;
    if (elMobileStreak) elMobileStreak.textContent = d;
    if (elSidebarStreak) elSidebarStreak.textContent = `🔥 ${d} ${d === 1 ? 'Day' : 'Days'}`;
    if (elDateDisplay) {
      elDateDisplay.textContent = `Date: ${state.lastHabitDate} • 45-Min Daily Protocol`;
    }
  }

  function toggleHabit(habitId, forceState) {
    const prev = Boolean(state.habitsCompleted[habitId]);
    const next = typeof forceState === 'boolean' ? forceState : !prev;
    state.habitsCompleted[habitId] = next;

    const completedCount = Object.values(state.habitsCompleted).filter(Boolean).length;

    if (completedCount === 3 && !state.streakIncrementedToday) {
      state.streakDays += 1;
      state.streakIncrementedToday = true;
      if (state.estimatedScore < 677) {
        state.estimatedScore = Math.min(677, state.estimatedScore + 2);
      }
      showToast(`🔥 All 45 mins completed! Streak is now ${state.streakDays} days (+2 Est. Score)!`);
    } else if (next && !prev) {
      showToast(`✅ Habit checked! (${completedCount}/3 daily blocks done)`);
    }

    saveState();
    renderHabitTracker();
    renderScoreTrajectoryHeader();
  }

  function renderHabitTracker() {
    updateStreakBadges();

    const listEl = document.getElementById('daily-habit-list');
    const summaryEl = document.getElementById('habit-completion-summary');
    if (!listEl) return;

    const completedCount = DAILY_HABITS_CONFIG.filter(
      (h) => state.habitsCompleted[h.id]
    ).length;
    const minsCompleted = completedCount * 15;

    if (summaryEl) {
      summaryEl.textContent = `${completedCount} / 3 Completed (${minsCompleted} / 45 mins)`;
    }

    listEl.innerHTML = '';

    DAILY_HABITS_CONFIG.forEach((habit) => {
      const isDone = Boolean(state.habitsCompleted[habit.id]);

      const item = document.createElement('div');
      item.className = `habit-item ${isDone ? 'completed' : ''}`;

      item.innerHTML = `
        <div class="habit-left" role="checkbox" aria-checked="${isDone}" tabindex="0" data-toggle-habit="${habit.id}">
          <div class="habit-checkbox" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <div>
            <div class="habit-title">${habit.title}</div>
            <div class="habit-subtitle">${habit.subtitle}</div>
            <div class="habit-meta-row">
              <span class="habit-tag">${habit.category}</span>
              <span class="habit-tag">⏱️ ${habit.minutes} mins</span>
              <span class="habit-tag">+${habit.xp} XP</span>
            </div>
          </div>
        </div>
        <div class="habit-actions">
          <button type="button" class="btn btn-outline btn-sm" data-launch-habit="${habit.id}">
            Open Practice &rarr;
          </button>
          <button type="button" class="btn btn-sm ${activeHabitForTimer === habit.id ? 'btn-primary' : 'btn-outline'}" data-timer-habit="${habit.id}">
            ⏱️ 15m Timer
          </button>
        </div>
      `;

      const leftToggle = item.querySelector(`[data-toggle-habit="${habit.id}"]`);
      leftToggle.addEventListener('click', () => toggleHabit(habit.id));
      leftToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleHabit(habit.id);
        }
      });

      const launchBtn = item.querySelector(`[data-launch-habit="${habit.id}"]`);
      launchBtn.addEventListener('click', () => {
        switchTab(habit.targetTab);
        if (habit.targetTab === 'drills') {
          switchDrillMode(habit.targetSubtab);
        }
      });

      const timerBtn = item.querySelector(`[data-timer-habit="${habit.id}"]`);
      timerBtn.addEventListener('click', () => {
        startHabitTimer(habit);
      });

      listEl.appendChild(item);
    });
  }

  function formatTimer(sec) {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateTimerUI() {
    const displayEl = document.getElementById('timer-display');
    const toggleBtn = document.getElementById('btn-timer-toggle');
    if (displayEl) displayEl.textContent = formatTimer(focusSecondsRemaining);
    if (toggleBtn) toggleBtn.textContent = focusTimerRunning ? 'Pause' : 'Start';
  }

  function startHabitTimer(habit) {
    activeHabitForTimer = habit.id;
    focusSecondsRemaining = habit.minutes * 60;
    const labelEl = document.getElementById('timer-active-label');
    const subEl = document.getElementById('timer-active-sub');
    if (labelEl) labelEl.textContent = `⏱️ Active: ${habit.title}`;
    if (subEl) subEl.textContent = `Stay focused for 15 minutes — auto-checks habit on finish.`;
    if (focusTimerInterval) clearInterval(focusTimerInterval);
    focusTimerRunning = true;
    renderHabitTracker();
    updateTimerUI();

    focusTimerInterval = setInterval(() => {
      if (focusSecondsRemaining > 0) {
        focusSecondsRemaining -= 1;
        updateTimerUI();
      } else {
        clearInterval(focusTimerInterval);
        focusTimerRunning = false;
        updateTimerUI();
        if (activeHabitForTimer) {
          toggleHabit(activeHabitForTimer, true);
        }
      }
    }, 1000);
  }

  function initHabitTracker() {
    renderHabitTracker();

    const resetBtn = document.getElementById('btn-reset-today-habits');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        state.habitsCompleted = {
          habit_structure: false,
          habit_reading: false,
          habit_fluency: false
        };
        saveState();
        renderHabitTracker();
        showToast('Today’s habit checklist has been reset.');
      });
    }

    const toggleTimerBtn = document.getElementById('btn-timer-toggle');
    const resetTimerBtn = document.getElementById('btn-timer-reset');

    if (toggleTimerBtn) {
      toggleTimerBtn.addEventListener('click', () => {
        if (focusTimerRunning) {
          clearInterval(focusTimerInterval);
          focusTimerRunning = false;
          updateTimerUI();
        } else {
          focusTimerRunning = true;
          updateTimerUI();
          focusTimerInterval = setInterval(() => {
            if (focusSecondsRemaining > 0) {
              focusSecondsRemaining -= 1;
              updateTimerUI();
            } else {
              clearInterval(focusTimerInterval);
              focusTimerRunning = false;
              updateTimerUI();
              if (activeHabitForTimer) toggleHabit(activeHabitForTimer, true);
            }
          }, 1000);
        }
      });
    }

    if (resetTimerBtn) {
      resetTimerBtn.addEventListener('click', () => {
        if (focusTimerInterval) clearInterval(focusTimerInterval);
        focusTimerRunning = false;
        focusSecondsRemaining = 15 * 60;
        updateTimerUI();
      });
    }
  }

  // =========================================================================
  // 8. MODULE 2.1: STRUCTURE & WRITTEN EXPRESSION LAB (LONGMAN 60 SKILLS)
  // =========================================================================

  function switchDrillMode(mode) {
    document.querySelectorAll('[data-drill-mode]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-drill-mode') === mode);
    });
    const strPane = document.getElementById('drill-structure-pane');
    const readPane = document.getElementById('drill-reading-pane');
    if (strPane) strPane.style.display = mode === 'structure' ? 'block' : 'none';
    if (readPane) readPane.style.display = mode === 'reading' ? 'block' : 'none';
  }

  function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * Renders a question sentence.
   * - For Part B (Error Recognition), wraps the 4 underlined segments [A], [B], [C], [D]
   *   in interactive clickable buttons right inside the sentence so users can tap them directly!
   */
  function buildInteractiveSentenceHtml(item, selectedIdx) {
    const isPartB =
      (item.section && item.section.toLowerCase().includes('part b')) ||
      item.question.includes('[A]');

    if (!isPartB) {
      // Part A: Highlight the blank nicely
      return item.question.replace(
        /_{3,}/g,
        '<span style="display:inline-block; min-width: 90px; border-bottom: 2.5px solid var(--accent-blue); margin: 0 4px;">&nbsp;</span>'
      );
    }

    let html = item.question;
    const letters = ['A', 'B', 'C', 'D'];

    item.options.forEach((optStr, optIdx) => {
      const letter = letters[optIdx];
      // Extract the segment text after "[A] "
      const segWords = optStr.replace(/^\[[A-D]\]\s*/, '').trim();
      const targetPattern = new RegExp(
        `\\[${letter}\\]\\s*${escapeRegExp(segWords)}`,
        'i'
      );

      let stateClass = '';
      if (typeof selectedIdx === 'number') {
        if (optIdx === item.correctIndex) stateClass = 'correct';
        else if (optIdx === selectedIdx) stateClass = 'incorrect';
      }

      const disabledAttr = typeof selectedIdx === 'number' ? 'disabled' : '';
      const replacementBtn = `<button type="button" class="inline-error-segment ${stateClass}" data-inline-opt="${optIdx}" ${disabledAttr} title="Tap segment [${letter}] ${segWords}"><span class="seg-letter">[${letter}]</span><span class="seg-words">${segWords}</span></button>`;

      if (targetPattern.test(html)) {
        html = html.replace(targetPattern, replacementBtn);
      } else {
        // Fallback if only single word follows [A]
        const fallbackPattern = new RegExp(`(\\[${letter}\\])\\s*([^\\s.,;]+)`, 'i');
        html = html.replace(
          fallbackPattern,
          `<button type="button" class="inline-error-segment ${stateClass}" data-inline-opt="${optIdx}" ${disabledAttr}><span class="seg-letter">$1</span><span class="seg-words">$2</span></button>`
        );
      }
    });

    return html;
  }

  /**
   * Builds the Instant Diagnostic Breakdown Card:
   * - Skill Category
   * - Structural Analysis (Main Subject, Main Verb, Option-by-option explanation)
   */
  function buildDiagnosticBreakdownHtml(item, selectedIdx) {
    const isCorrect = selectedIdx === item.correctIndex;
    const letters = ['A', 'B', 'C', 'D'];
    const chosenLabel = item.options[selectedIdx] || letters[selectedIdx];
    const correctLabel = item.options[item.correctIndex] || letters[item.correctIndex];

    const struct = item.structuralAnalysis || {
      mainSubject: 'See clause structure in explanation below',
      mainVerb: 'See finite verb agreement in explanation below',
      optionBreakdown: []
    };

    const optionBreakdownHtml =
      Array.isArray(struct.optionBreakdown) && struct.optionBreakdown.length > 0
        ? `<ul class="option-analysis-list">
             ${struct.optionBreakdown.map((line) => `<li>${line}</li>`).join('')}
           </ul>`
        : '';

    return `
      <div class="diagnostic-card ${isCorrect ? 'correct' : 'incorrect'}">
        <div class="diagnostic-header">
          <div class="diagnostic-status-title">
            ${
              isCorrect
                ? `✓ Correct! "${correctLabel}" is the right answer.`
                : `✗ Incorrect (You chose "${chosenLabel}" • Correct Answer: "${correctLabel}")`
            }
          </div>
          <span class="diagnostic-skill-pill">📘 Longman ${item.skill}</span>
        </div>

        <div style="font-size: 0.92rem; line-height: 1.65; color: var(--text-navy);">
          <strong>Diagnostic Rule &amp; Explanation:</strong> ${item.explanation}
        </div>

        <div class="structural-analysis-grid">
          <div class="struct-node-box">
            <div class="struct-node-label">🔍 Main Subject</div>
            <div class="struct-node-val">${struct.mainSubject}</div>
          </div>
          <div class="struct-node-box">
            <div class="struct-node-label">⚡ Main Verb</div>
            <div class="struct-node-val">${struct.mainVerb}</div>
          </div>
        </div>

        ${optionBreakdownHtml}
      </div>
    `;
  }

  function handleStructureAnswer(item, chosenIdx) {
    if (typeof state.structureAnswers[item.id] === 'number') return;
    state.structureAnswers[item.id] = chosenIdx;
    recordQuestionAttempt(item, chosenIdx);
    renderStructureDrill();
  }

  function renderStructureQuestionPills() {
    const container = document.getElementById('str-question-pills');
    if (!container) return;
    container.innerHTML = '';

    state.questionsDatabase.forEach((q, idx) => {
      const ans = state.structureAnswers[q.id];
      const isCurrent = idx === state.currentStructureIndex;
      let statusDot = '';
      if (typeof ans === 'number') {
        statusDot = ans === q.correctIndex ? ' ✓' : ' ✗';
      }

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `preset-chip ${isCurrent ? 'active' : ''}`;
      const shortType = q.section.includes('Part B') ? 'Part B' : 'Part A';
      btn.textContent = `Q${idx + 1} (${shortType})${statusDot}`;
      btn.addEventListener('click', () => {
        state.currentStructureIndex = idx;
        saveState();
        renderStructureDrill();
      });
      container.appendChild(btn);
    });
  }

  function renderStructureDrill() {
    renderStructureQuestionPills();

    const questions = state.questionsDatabase;
    const idx = Math.max(0, Math.min(questions.length - 1, state.currentStructureIndex));
    const item = questions[idx];
    if (!item) return;

    const isPartB =
      (item.section && item.section.toLowerCase().includes('part b')) ||
      item.question.includes('[A]');

    document.getElementById('str-section-badge').textContent = item.section;
    document.getElementById('str-skill-badge').textContent = item.skill;
    document.getElementById('str-progress-counter').textContent = `Question ${idx + 1} of ${questions.length}`;

    const partBHint = document.getElementById('str-part-b-hint');
    if (partBHint) {
      partBHint.style.display = isPartB ? 'flex' : 'none';
    }

    const selectedIdx = state.structureAnswers[item.id];
    const promptEl = document.getElementById('str-question-prompt');
    promptEl.innerHTML = buildInteractiveSentenceHtml(item, selectedIdx);

    // Attach click listeners to inline underlined Part B segments
    promptEl.querySelectorAll('[data-inline-opt]').forEach((segBtn) => {
      segBtn.addEventListener('click', () => {
        const optIndex = Number(segBtn.getAttribute('data-inline-opt'));
        handleStructureAnswer(item, optIndex);
      });
    });

    const optionsEl = document.getElementById('str-options-container');
    const feedbackEl = document.getElementById('str-feedback-box');
    optionsEl.innerHTML = '';
    feedbackEl.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];

    item.options.forEach((optText, oIdx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';

      if (typeof selectedIdx === 'number') {
        btn.disabled = true;
        if (oIdx === item.correctIndex) {
          btn.classList.add('correct');
        } else if (oIdx === selectedIdx && selectedIdx !== item.correctIndex) {
          btn.classList.add('incorrect');
        }
      }

      btn.innerHTML = `
        <span class="option-letter">${letters[oIdx]}</span>
        <span>${optText}</span>
      `;

      btn.addEventListener('click', () => handleStructureAnswer(item, oIdx));
      optionsEl.appendChild(btn);
    });

    if (typeof selectedIdx === 'number') {
      feedbackEl.innerHTML = buildDiagnosticBreakdownHtml(item, selectedIdx);
    }
  }

  // =========================================================================
  // 9. MODULE 2.2: ACADEMIC READING & TAP-TO-SAVE AWL VOCABULARY
  // =========================================================================

  function setReadingLayoutMode(mode) {
    state.readingLayoutMode = mode;
    saveState();

    document.querySelectorAll('[data-reading-layout]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-reading-layout') === mode);
    });

    const grid = document.getElementById('reading-workspace-grid');
    if (grid) {
      grid.className = `reading-workspace-grid mode-${mode}`;
    }
  }

  function isAwlWordSaved(wordId) {
    return state.savedVocabularyDeck.some((v) => v.id === wordId);
  }

  function toggleSaveAwlWord(awlObj) {
    const existingIndex = state.savedVocabularyDeck.findIndex((v) => v.id === awlObj.id);
    if (existingIndex >= 0) {
      state.savedVocabularyDeck.splice(existingIndex, 1);
      showToast(`Removed "${awlObj.word}" from Flashcard Deck.`);
    } else {
      state.savedVocabularyDeck.unshift(
        Object.assign({}, awlObj, { mastered: false })
      );
      showToast(`🗂️ Saved "${awlObj.word}" to your AWL Flashcard Deck!`);
    }
    saveState();
    const passage = READING_PASSAGES[state.currentPassageIndex];
    if (passage) renderReadingAwlCards(passage);
    updateReviewBadges();
  }

  function renderReadingDrill() {
    const passage = READING_PASSAGES[state.currentPassageIndex];
    if (!passage) return;

    setReadingLayoutMode(state.readingLayoutMode || 'split');

    document.getElementById('read-passage-title').textContent = passage.title;
    document.getElementById('read-passage-meta').textContent = `${passage.topic} • ${passage.lines.length} Numbered Lines`;
    document.getElementById('btn-switch-passage').textContent = `Switch Passage (${state.currentPassageIndex + 1}/${READING_PASSAGES.length})`;

    // Render numbered lines (Line 1, 5, 10, 15... marked clearly)
    const contentEl = document.getElementById('read-passage-content');
    const rowsHtml = passage.lines
      .map((lineText, idx) => {
        const lineNum = idx + 1;
        const isMilestone = lineNum === 1 || lineNum % 5 === 0;
        const label =
          lineNum === 1
            ? 'Line 1'
            : isMilestone
            ? `(${lineNum})`
            : `${lineNum}`;

        let highlightedLine = lineText;
        passage.awlWords.forEach((awl) => {
          const regex = new RegExp(`\\b(${awl.word})\\b`, 'gi');
          highlightedLine = highlightedLine.replace(
            regex,
            `<span class="awl-highlight" data-awl-word="${awl.word}" title="Tap to inspect & save '${awl.word}'">$1</span>`
          );
        });

        return `
          <div class="passage-line-row">
            <span class="passage-line-num ${isMilestone ? 'milestone-line' : ''}">${label}</span>
            <span class="passage-line-text">${highlightedLine}</span>
          </div>
        `;
      })
      .join('');

    contentEl.innerHTML = rowsHtml;

    contentEl.querySelectorAll('[data-awl-word]').forEach((span) => {
      span.addEventListener('click', () => {
        const w = span.getAttribute('data-awl-word').toLowerCase();
        state.activeAwlWord = w;
        const matchedAwl = passage.awlWords.find((a) => a.word.toLowerCase() === w);
        if (matchedAwl && !isAwlWordSaved(matchedAwl.id)) {
          toggleSaveAwlWord(matchedAwl);
        } else {
          renderReadingAwlCards(passage);
        }
      });
    });

    renderReadingAwlCards(passage);
    renderReadingQuestions(passage);
  }

  function renderReadingAwlCards(passage) {
    const grid = document.getElementById('read-awl-grid');
    if (!grid) return;
    grid.innerHTML = '';

    passage.awlWords.forEach((awl) => {
      const isSelected = state.activeAwlWord === awl.word.toLowerCase();
      const saved = isAwlWordSaved(awl.id);

      const card = document.createElement('div');
      card.className = `awl-card ${isSelected ? 'active-word' : ''}`;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap;">
          <div>
            <strong style="font-size: 1rem; color: var(--accent-blue);">${awl.word}</strong>
            <span style="font-size: 0.74rem; color: var(--text-muted); margin-left: 6px;">${awl.partOfSpeech} • ${awl.phonetic} • ${awl.lineRef}</span>
          </div>
          <button type="button" class="awl-save-btn ${saved ? 'saved' : ''}" data-save-awl="${awl.id}">
            ${saved ? '✓ Saved in Flashcard Deck' : '+ Tap to Save Vocab'}
          </button>
        </div>
        <div style="font-size: 0.8rem; font-weight: 700; color: var(--emerald-dark); margin: 5px 0 3px;">
          TOEFL Synonym: ${awl.toeflSynonym}
        </div>
        <div style="font-size: 0.82rem; color: var(--text-secondary);">
          ${awl.meaning}
        </div>
      `;

      card.querySelector(`[data-save-awl="${awl.id}"]`).addEventListener('click', () => {
        toggleSaveAwlWord(awl);
      });

      grid.appendChild(card);
    });
  }

  function renderReadingQuestions(passage) {
    const container = document.getElementById('read-questions-list');
    if (!container) return;
    container.innerHTML = '';

    const letters = ['A', 'B', 'C', 'D'];

    passage.questions.forEach((q, qIdx) => {
      const selected = state.readingAnswers[q.id];
      const block = document.createElement('div');
      block.style.marginBottom = '16px';
      block.style.padding = '16px';
      block.style.background = 'var(--bg-slate)';
      block.style.borderRadius = 'var(--radius-md)';
      block.style.border = '1px solid var(--border-subtle)';

      let optionsHtml = '';
      q.options.forEach((opt, oIdx) => {
        let cls = 'option-btn';
        if (typeof selected === 'number') {
          if (oIdx === q.correctIndex) cls += ' correct';
          else if (oIdx === selected) cls += ' incorrect';
        }
        optionsHtml += `
          <button type="button" class="${cls}" data-rq-id="${q.id}" data-rq-opt="${oIdx}" ${typeof selected === 'number' ? 'disabled' : ''}>
            <span class="option-letter">${letters[oIdx]}</span>
            <span>${opt}</span>
          </button>
        `;
      });

      const feedbackHtml =
        typeof selected === 'number'
          ? `<div class="diagnostic-card ${selected === q.correctIndex ? 'correct' : 'incorrect'}" style="margin-top: 10px; padding: 12px 14px;">
               <div style="font-weight: 800; margin-bottom: 4px;">
                 ${selected === q.correctIndex ? '✓ Correct!' : '✗ Saved to Smart Error Log'} • ${q.skill}
               </div>
               <div style="font-size: 0.86rem;">${q.explanation}</div>
             </div>`
          : '';

      block.innerHTML = `
        <div style="font-size: 0.72rem; font-weight: 800; color: var(--accent-blue); text-transform: uppercase; margin-bottom: 4px;">
          Question ${qIdx + 1} • ${q.skill}
        </div>
        <div style="font-weight: 700; margin-bottom: 12px;">${q.question}</div>
        <div class="options-grid">${optionsHtml}</div>
        ${feedbackHtml}
      `;

      block.querySelectorAll('[data-rq-id]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const ans = Number(btn.getAttribute('data-rq-opt'));
          state.readingAnswers[q.id] = ans;
          recordQuestionAttempt(
            Object.assign({ section: 'Reading Section 3' }, q),
            ans
          );
          renderReadingQuestions(passage);
        });
      });

      container.appendChild(block);
    });
  }

  function initDrillsModule() {
    document.querySelectorAll('[data-drill-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        switchDrillMode(btn.getAttribute('data-drill-mode'));
      });
    });

    document.querySelectorAll('[data-reading-layout]').forEach((btn) => {
      btn.addEventListener('click', () => {
        setReadingLayoutMode(btn.getAttribute('data-reading-layout'));
      });
    });

    document.getElementById('btn-str-prev').addEventListener('click', () => {
      state.currentStructureIndex =
        (state.currentStructureIndex - 1 + state.questionsDatabase.length) %
        state.questionsDatabase.length;
      saveState();
      renderStructureDrill();
    });

    document.getElementById('btn-str-next').addEventListener('click', () => {
      state.currentStructureIndex =
        (state.currentStructureIndex + 1) % state.questionsDatabase.length;
      saveState();
      renderStructureDrill();
    });

    document.getElementById('btn-str-retry-current').addEventListener('click', () => {
      const currentItem = state.questionsDatabase[state.currentStructureIndex];
      if (currentItem) {
        delete state.structureAnswers[currentItem.id];
        saveState();
        renderStructureDrill();
      }
    });

    document.getElementById('btn-complete-structure-habit').addEventListener('click', () => {
      toggleHabit('habit_structure', true);
    });

    document.getElementById('btn-switch-passage').addEventListener('click', () => {
      state.currentPassageIndex = (state.currentPassageIndex + 1) % READING_PASSAGES.length;
      state.activeAwlWord = null;
      saveState();
      renderReadingDrill();
    });

    document.getElementById('btn-save-all-awl').addEventListener('click', () => {
      const passage = READING_PASSAGES[state.currentPassageIndex];
      if (!passage) return;
      let added = 0;
      passage.awlWords.forEach((awl) => {
        if (!isAwlWordSaved(awl.id)) {
          state.savedVocabularyDeck.unshift(Object.assign({}, awl, { mastered: false }));
          added += 1;
        }
      });
      saveState();
      renderReadingAwlCards(passage);
      updateReviewBadges();
      showToast(
        added > 0
          ? `🗂️ Saved ${added} AWL words to your Flashcard Deck!`
          : 'All 5 AWL words from this passage are already in your deck.'
      );
    });

    document.getElementById('btn-complete-reading-habit').addEventListener('click', () => {
      toggleHabit('habit_reading', true);
    });

    renderStructureDrill();
    renderReadingDrill();
  }

  // =========================================================================
  // 10. MODULE 3 (REVIEW TAB): SMART ERROR LOG (`error_log`) & SPACED REPETITION
  // =========================================================================

  let currentReviewMode = 'errors';
  let retryQueue = [];
  let retryCursor = 0;
  let retryAnswers = {};

  function updateReviewBadges() {
    const errorCount = errorLog.length;
    const vocabCount = state.savedVocabularyDeck.length;

    const sidebarCount = document.getElementById('sidebar-review-count');
    const headerStats = document.getElementById('review-deck-stats');
    const tabErrCount = document.getElementById('tab-error-count');
    const tabVocabCount = document.getElementById('tab-vocab-count');

    if (sidebarCount) sidebarCount.textContent = String(errorCount);
    if (headerStats) headerStats.textContent = `${errorCount} Weak Questions • ${vocabCount} AWL Cards`;
    if (tabErrCount) tabErrCount.textContent = String(errorCount);
    if (tabVocabCount) tabVocabCount.textContent = String(vocabCount);
  }

  function switchReviewMode(mode) {
    currentReviewMode = mode;
    document.querySelectorAll('[data-review-mode]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-review-mode') === mode);
    });

    const errPane = document.getElementById('review-errors-pane');
    const retryPane = document.getElementById('review-retry-pane');
    const flashPane = document.getElementById('review-flashcards-pane');

    if (errPane) errPane.style.display = mode === 'errors' ? 'block' : 'none';
    if (retryPane) retryPane.style.display = mode === 'retry' ? 'block' : 'none';
    if (flashPane) flashPane.style.display = mode === 'flashcards' ? 'block' : 'none';

    if (mode === 'errors') renderGroupedErrorLog();
    if (mode === 'retry') renderRetryArena();
    if (mode === 'flashcards') renderVocabFlashcards();
  }

  function startRetryWeakQuestions(skillFilter) {
    if (skillFilter) {
      retryQueue = errorLog.filter((q) => (q.skill || q.section) === skillFilter);
    } else {
      retryQueue = errorLog.slice();
    }

    if (retryQueue.length === 0) {
      // Fallback to all seed structure questions if error_log has been cleared
      retryQueue = state.questionsDatabase.slice();
    }

    retryCursor = 0;
    retryAnswers = {};
    switchReviewMode('retry');
  }

  function renderGroupedErrorLog() {
    const container = document.getElementById('review-errors-pane');
    if (!container) return;

    updateReviewBadges();

    // Group `error_log` items by Grammar Skill / Question Type
    const groups = {};
    errorLog.forEach((item) => {
      const skillKey = item.skill || item.section || 'General TOEFL Skill';
      if (!groups[skillKey]) {
        groups[skillKey] = [];
      }
      groups[skillKey].push(item);
    });

    // Also include tracked skills from state.skillStats so the user sees accuracy breakdown
    const allSkillKeys = Array.from(
      new Set([...Object.keys(groups), ...Object.keys(state.skillStats)])
    );

    if (errorLog.length === 0) {
      container.innerHTML = `
        <div style="padding: 24px; text-align: center; background: var(--emerald-soft); border: 1.5px solid var(--emerald-border); border-radius: var(--radius-lg);">
          <div style="font-size: 1.1rem; font-weight: 800; color: var(--emerald-dark); margin-bottom: 6px;">
            🎉 Zero Active Weaknesses in <code>error_log</code>!
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary);">
            You have resolved all logged mistakes. Head to the Drills tab or practice any skill group below.
          </p>
        </div>
      `;
      return;
    }

    const letters = ['A', 'B', 'C', 'D'];
    let html = `<div class="weakness-skill-grid">`;

    allSkillKeys.forEach((skillName) => {
      const items = groups[skillName] || [];
      const stats = state.skillStats[skillName] || {
        attempts: Math.max(items.length + 1, 2),
        correct: 1
      };
      const accuracyPct =
        stats.attempts > 0
          ? Math.round((stats.correct / stats.attempts) * 100)
          : 40;

      const pillClass =
        accuracyPct < 55 ? 'low' : accuracyPct < 80 ? 'mid' : 'high';

      if (items.length === 0 && accuracyPct >= 80) return;

      const itemsListHtml = items
        .map(
          (q) => `
          <div style="padding: 12px 14px; background: var(--card-white); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); margin-top: 8px;">
            <div style="font-size: 0.72rem; font-weight: 800; color: var(--coral-dark); text-transform: uppercase;">
              ${q.section || 'TOEFL Question'} • Logged Mistake
            </div>
            <div style="font-weight: 700; font-size: 0.92rem; margin: 4px 0;">
              ${q.question}
            </div>
            <div style="font-size: 0.82rem; color: var(--emerald-dark); font-weight: 700;">
              ✓ Correct Answer: ${q.options ? q.options[q.correctIndex] : letters[q.correctIndex]}
            </div>
            <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px;">
              ${q.explanation}
            </div>
          </div>
        `
        )
        .join('');

      html += `
        <div class="weakness-skill-card">
          <div class="weakness-skill-header">
            <div>
              <div style="font-size: 0.98rem; font-weight: 800; color: var(--text-navy);">
                ${skillName}
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">
                ${items.length} question(s) in <code>error_log</code> • ${stats.correct}/${stats.attempts} correct attempts
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="accuracy-pill ${pillClass}">
                ${skillName.split(':')[0]}: ${accuracyPct}% accuracy
              </span>
              ${
                items.length > 0
                  ? `<button type="button" class="btn btn-primary btn-sm" data-retry-skill="${skillName}">
                       Retry Weak Questions (${items.length})
                     </button>`
                  : ''
              }
            </div>
          </div>
          <div class="progress-track" style="height: 8px; margin-bottom: 8px;">
            <div class="progress-fill" style="width: ${accuracyPct}%;"></div>
          </div>
          ${itemsListHtml}
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    container.querySelectorAll('[data-retry-skill]').forEach((btn) => {
      btn.addEventListener('click', () => {
        startRetryWeakQuestions(btn.getAttribute('data-retry-skill'));
      });
    });
  }

  function renderRetryArena() {
    const container = document.getElementById('review-retry-pane');
    if (!container) return;

    if (retryQueue.length === 0) {
      retryQueue = errorLog.length > 0 ? errorLog.slice() : state.questionsDatabase.slice();
      retryCursor = 0;
    }

    const q = retryQueue[retryCursor];
    if (!q) return;

    const selected = retryAnswers[q.id];
    const letters = ['A', 'B', 'C', 'D'];

    const sentenceHtml = buildInteractiveSentenceHtml(q, selected);

    const optionsHtml = (q.options || [])
      .map((opt, oIdx) => {
        let cls = 'option-btn';
        if (typeof selected === 'number') {
          if (oIdx === q.correctIndex) cls += ' correct';
          else if (oIdx === selected) cls += ' incorrect';
        }
        return `
          <button type="button" class="${cls}" data-retry-opt="${oIdx}" ${typeof selected === 'number' ? 'disabled' : ''}>
            <span class="option-letter">${letters[oIdx]}</span>
            <span>${opt}</span>
          </button>
        `;
      })
      .join('');

    const diagnosticHtml =
      typeof selected === 'number'
        ? buildDiagnosticBreakdownHtml(q, selected)
        : '';

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <div>
          <span class="scaled-pill">${q.section || 'Weakness Retry'}</span>
          <span class="raw-pill" style="margin-left: 6px;">${q.skill || 'Targeted Review'}</span>
        </div>
        <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-secondary);">
          Weak Question ${retryCursor + 1} of ${retryQueue.length}
        </span>
      </div>

      <div class="question-prompt-box" id="retry-prompt-box">${sentenceHtml}</div>
      <div class="options-grid">${optionsHtml}</div>
      ${diagnosticHtml}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; flex-wrap: wrap; gap: 10px;">
        <button type="button" class="btn btn-outline" id="btn-retry-prev" ${retryCursor === 0 ? 'disabled' : ''}>&larr; Previous</button>
        <button type="button" class="btn btn-emerald" id="btn-remove-from-error-log">
          ✓ Mastered (Remove from error_log)
        </button>
        <button type="button" class="btn btn-primary" id="btn-retry-next">
          ${retryCursor < retryQueue.length - 1 ? 'Next Weak Question &rarr;' : 'Back to Weakness Log'}
        </button>
      </div>
    `;

    const handleRetryPick = (chosenIdx) => {
      retryAnswers[q.id] = chosenIdx;
      recordQuestionAttempt(q, chosenIdx);
      if (chosenIdx === q.correctIndex) {
        showToast('✓ Correct on Retry! Accuracy boosted.');
      }
      renderRetryArena();
    };

    container.querySelectorAll('[data-inline-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        handleRetryPick(Number(btn.getAttribute('data-inline-opt')));
      });
    });

    container.querySelectorAll('[data-retry-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        handleRetryPick(Number(btn.getAttribute('data-retry-opt')));
      });
    });

    const prevBtn = document.getElementById('btn-retry-prev');
    const nextBtn = document.getElementById('btn-retry-next');
    const masterBtn = document.getElementById('btn-remove-from-error-log');

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (retryCursor > 0) {
          retryCursor -= 1;
          renderRetryArena();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (retryCursor < retryQueue.length - 1) {
          retryCursor += 1;
          renderRetryArena();
        } else {
          switchReviewMode('errors');
        }
      });
    }

    if (masterBtn) {
      masterBtn.addEventListener('click', () => {
        errorLog = errorLog.filter((item) => item.id !== q.id);
        saveErrorLog(errorLog);
        updateReviewBadges();
        showToast('Removed question from error_log!');
        switchReviewMode('errors');
      });
    }
  }

  function renderVocabFlashcards() {
    const container = document.getElementById('review-flashcards-pane');
    if (!container) return;

    const deck = state.savedVocabularyDeck;
    if (deck.length === 0) {
      container.innerHTML = `
        <div style="padding: 24px; text-align: center; background: var(--bg-slate); border-radius: var(--radius-md); border: 1px solid var(--border-subtle);">
          <strong>No AWL Words Saved Yet</strong>
          <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 6px;">
            Go to <strong>Drills &rarr; Section 3: Reading &amp; AWL Vocab</strong> and tap <em>"+ Tap to Save Vocab"</em> on any Academic Word List entry.
          </p>
        </div>
      `;
      return;
    }

    const idx = Math.max(0, Math.min(deck.length - 1, state.currentVocabCardIndex));
    const card = deck[idx];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
        <span class="section-eyebrow">AWL Flashcard • ${card.partOfSpeech || 'Academic Word'}</span>
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">
          Card ${idx + 1} of ${deck.length} ${card.mastered ? '• ✅ Mastered' : '• 📌 Learning'}
        </span>
      </div>

      <div class="flashcard-box" id="vocab-flashcard-box" tabindex="0" role="button">
        <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px;">
          ${state.vocabCardFlipped ? 'TOEFL Synonym, Definition & Context (Tap to flip)' : 'Academic Word List Headword (Tap to reveal meaning)'}
        </div>
        ${
          state.vocabCardFlipped
            ? `
              <div style="font-size: 1.05rem; font-weight: 800; color: var(--emerald-dark); margin-bottom: 6px;">
                TOEFL Synonym: ${card.toeflSynonym}
              </div>
              <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-navy); max-width: 580px;">
                ${card.meaning}
              </div>
              <div style="font-size: 0.82rem; color: var(--text-secondary); font-style: italic; margin-top: 10px;">
                "${card.contextQuote || ''}"
              </div>
            `
            : `
              <div style="font-size: 2rem; font-weight: 800; color: var(--accent-blue);">
                ${card.word}
              </div>
              <div style="font-size: 0.88rem; color: var(--text-muted); margin-top: 4px;">
                ${card.phonetic || ''} • ${card.lineRef || ''}
              </div>
            `
        }
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
        <button type="button" class="btn btn-outline" id="btn-voc-prev">&larr; Previous Word</button>
        <div style="display: flex; gap: 8px;">
          <button type="button" class="btn btn-outline" id="btn-voc-flip">Flip Flashcard</button>
          <button type="button" class="btn ${card.mastered ? 'btn-outline' : 'btn-emerald'}" id="btn-voc-master">
            ${card.mastered ? 'Mark Unmastered' : '✓ Mark Mastered'}
          </button>
        </div>
        <button type="button" class="btn btn-primary" id="btn-voc-next">Next Word &rarr;</button>
      </div>
    `;

    const flipFn = () => {
      state.vocabCardFlipped = !state.vocabCardFlipped;
      renderVocabFlashcards();
    };

    document.getElementById('vocab-flashcard-box').addEventListener('click', flipFn);
    document.getElementById('btn-voc-flip').addEventListener('click', flipFn);

    document.getElementById('btn-voc-master').addEventListener('click', () => {
      card.mastered = !card.mastered;
      saveState();
      renderVocabFlashcards();
    });

    document.getElementById('btn-voc-prev').addEventListener('click', () => {
      state.currentVocabCardIndex = (idx - 1 + deck.length) % deck.length;
      state.vocabCardFlipped = false;
      renderVocabFlashcards();
    });

    document.getElementById('btn-voc-next').addEventListener('click', () => {
      state.currentVocabCardIndex = (idx + 1) % deck.length;
      state.vocabCardFlipped = false;
      renderVocabFlashcards();
    });
  }

  function renderReviewTab() {
    updateReviewBadges();
    switchReviewMode(currentReviewMode);
  }

  function initReviewModule() {
    document.querySelectorAll('[data-review-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        switchReviewMode(btn.getAttribute('data-review-mode'));
      });
    });

    const retryAllBtn = document.getElementById('btn-retry-all-weak');
    if (retryAllBtn) {
      retryAllBtn.addEventListener('click', () => {
        startRetryWeakQuestions(null);
      });
    }

    renderReviewTab();
  }

  // =========================================================================
  // 11. MODULE 4: SIMULASI (15-MIN DIAGNOSTIC SPRINT & FULL SECTION TIMED MODE)
  // =========================================================================

  let simMode = 'sprint15'; // 'sprint15' | 'fullsection'
  let fullSectionFilter = 'all'; // 'all' | 'Structure' | 'Reading' | 'Listening'
  let simQuestions = SIMULASI_SPRINT_15_QUESTIONS.slice();
  let simIndex = 0;
  let simUserAnswers = {};
  let simFlagged = {};
  let simFinished = false;
  let simTotalSecondsLeft = 15 * 60;
  let simQuestionElapsedSec = 0;
  let simTimerId = null;
  let simAudioSpeed = 1.0;

  function buildFullSectionQuestionPool(sectionFilter) {
    // Combine all high-difficulty questions across Listening, Structure, and Reading
    const pool = [
      ...SIMULASI_SPRINT_15_QUESTIONS,
      ...SEED_STRUCTURE_QUESTIONS.map((q) =>
        Object.assign({}, q, {
          id: `full-${q.id}`,
          section: 'Structure',
          part: `Section 2 • ${q.section}`,
          targetSeconds: 35
        })
      ),
      ...READING_PASSAGES[0].questions.map((rq) =>
        Object.assign({}, rq, {
          id: `full-${rq.id}`,
          section: 'Reading',
          part: `Section 3 • ${READING_PASSAGES[0].title}`,
          passageSnippet: READING_PASSAGES[0].lines
            .map((l, i) => `${i === 0 ? '(Line 1) ' : (i + 1) % 5 === 0 ? `(${i + 1}) ` : ''}${l}`)
            .join(' '),
          targetSeconds: 55
        })
      ),
      ...READING_PASSAGES[1].questions.map((rq) =>
        Object.assign({}, rq, {
          id: `full-${rq.id}`,
          section: 'Reading',
          part: `Section 3 • ${READING_PASSAGES[1].title}`,
          passageSnippet: READING_PASSAGES[1].lines
            .map((l, i) => `${i === 0 ? '(Line 1) ' : (i + 1) % 5 === 0 ? `(${i + 1}) ` : ''}${l}`)
            .join(' '),
          targetSeconds: 55
        })
      )
    ];

    if (sectionFilter && sectionFilter !== 'all') {
      return pool.filter((q) => q.section === sectionFilter);
    }
    return pool;
  }

  function configureSimulasiSession(mode, sectionSubFilter) {
    simMode = mode || 'sprint15';
    fullSectionFilter = sectionSubFilter || 'all';

    if (simMode === 'sprint15') {
      simQuestions = SIMULASI_SPRINT_15_QUESTIONS.slice();
      simTotalSecondsLeft = 15 * 60; // Strict 15-Minute Diagnostic Sprint
    } else {
      simQuestions = buildFullSectionQuestionPool(fullSectionFilter);
      if (fullSectionFilter === 'Structure') {
        simTotalSecondsLeft = 25 * 60; // Official 25-min Structure section timer
      } else if (fullSectionFilter === 'Reading') {
        simTotalSecondsLeft = 55 * 60; // Official 55-min Reading section timer
      } else if (fullSectionFilter === 'Listening') {
        simTotalSecondsLeft = 35 * 60; // Official 35-min Listening section timer
      } else {
        simTotalSecondsLeft = 35 * 60; // Full Combined Section Timed Mode
      }
    }

    simIndex = 0;
    simUserAnswers = {};
    simFlagged = {};
    simFinished = false;
    simQuestionElapsedSec = 0;
    startSimulasiTimer();
    renderSimulasi();
  }

  function speakDialogue(lines, rateOverride) {
    if (!('speechSynthesis' in window)) {
      showToast('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const baseRate = rateOverride || simAudioSpeed || 1.0;

    lines.forEach((line) => {
      const utter = new SpeechSynthesisUtterance(`${line.speaker}: ${line.text}`);
      utter.lang = 'en-US';
      utter.rate = line.speaker === 'Narrator' ? baseRate * 0.95 : baseRate;
      utter.pitch =
        line.speaker === 'Woman'
          ? 1.15
          : line.speaker === 'Man'
          ? 0.9
          : line.speaker === 'Professor'
          ? 0.96
          : 1.0;
      window.speechSynthesis.speak(utter);
    });
  }

  function getTargetPacingSeconds(q) {
    if (q.targetSeconds) return q.targetSeconds;
    if (q.section === 'Reading') return 55; // Strict 55s per Reading question
    return 35; // Strict 35s per Structure / Listening question
  }

  function startSimulasiTimer() {
    if (simTimerId) clearInterval(simTimerId);
    simTimerId = setInterval(() => {
      if (simFinished) return;

      if (simTotalSecondsLeft > 0) {
        simTotalSecondsLeft -= 1;
        simQuestionElapsedSec += 1;

        const timerEl = document.getElementById('sim-overall-timer');
        if (timerEl) timerEl.textContent = `⏱️ Total: ${formatTimer(simTotalSecondsLeft)}`;

        const q = simQuestions[simIndex];
        if (q) {
          const targetSec = getTargetPacingSeconds(q);
          const paceEl = document.getElementById('sim-question-pace-badge');
          if (paceEl) {
            const isOver = simQuestionElapsedSec > targetSec;
            paceEl.className = `pacing-badge ${isOver ? 'over-pace' : ''}`;
            paceEl.textContent = `${
              isOver ? '⚠️ Over Target Pace:' : '⚡ Strict Pacing:'
            } ${simQuestionElapsedSec}s / ${targetSec}s (${q.section})`;
          }
        }
      } else {
        finishSimulasiExam();
      }
    }, 1000);
  }

  function finishSimulasiExam() {
    simFinished = true;

    let totalL = 0,
      correctL = 0;
    let totalS = 0,
      correctS = 0;
    let totalR = 0,
      correctR = 0;

    simQuestions.forEach((q) => {
      const isRight = simUserAnswers[q.id] === q.correctIndex;
      if (q.section === 'Listening') {
        totalL += 1;
        if (isRight) correctL += 1;
      } else if (q.section === 'Structure') {
        totalS += 1;
        if (isRight) correctS += 1;
      } else if (q.section === 'Reading') {
        totalR += 1;
        if (isRight) correctR += 1;
      }
    });

    // Map accuracy ratios to official raw score scales (with baseline floor if a section wasn't tested)
    const ratioL = totalL > 0 ? correctL / totalL : 29 / 50;
    const ratioS = totalS > 0 ? correctS / totalS : 25 / 40;
    const ratioR = totalR > 0 ? correctR / totalR : 32 / 50;

    // Calibrated raw score projection (baseline floor 24/50 L, 20/40 S, 24/50 R up to 50/40/50)
    const projRawL = Math.round(22 + ratioL * 28);
    const projRawS = Math.round(18 + ratioS * 22);
    const projRawR = Math.round(22 + ratioR * 28);

    const calc = calculateToeflItpScore(projRawL, projRawS, projRawR);

    // Automatically update the user's Estimated TOEFL Score on the Home Dashboard!
    state.estimatedScore = calc.finalScore;
    state.estimatedBreakdown = {
      scaledL: calc.scaledL,
      scaledS: calc.scaledS,
      scaledR: calc.scaledR
    };
    saveState();
    renderScoreTrajectoryHeader();
    showToast(
      `🎉 Test Complete! Home Dashboard Estimated Score automatically updated to ${calc.finalScore}.`
    );

    renderSimulasiReport(calc, {
      totalL,
      correctL,
      totalS,
      correctS,
      totalR,
      correctR
    });
  }

  function renderSimulasiReport(calc, counts) {
    const container = document.getElementById('simulasi-active-container');
    if (!container) return;

    const totalAnswered = Object.keys(simUserAnswers).length;
    const totalCorrect = counts.correctL + counts.correctS + counts.correctR;

    container.innerHTML = `
      <div class="calculator-result-panel" style="margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
          <span class="calc-simulated-label">
            ${
              simMode === 'sprint15'
                ? 'Quick 15-Min Diagnostic Sprint — Official Score Report'
                : 'Full Section Timed Mode — Official Score Report'
            }
          </span>
          <span class="points-remaining-badge achieved">
            ✓ Auto-Synced to Home Dashboard Header
          </span>
        </div>

        <div class="calc-big-score-wrap">
          <div class="calc-big-score ${calc.finalScore >= 600 ? 'hit-600' : ''}">${calc.finalScore}</div>
          <div class="calc-summary-equation">
            Projected L: ${calc.rawL}/50 [${calc.scaledL}] • S: ${calc.rawS}/40 [${calc.scaledS}] • R: ${calc.rawR}/50 [${calc.scaledR}] &rArr; Final Score: ${calc.finalScore}
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center;">
          <div style="background: rgba(255,255,255,0.08); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700;">LISTENING</div>
            <div style="font-size: 1.1rem; font-weight: 800;">${counts.correctL}/${counts.totalL} Correct</div>
            <div style="font-size: 0.75rem; color: #93C5FD;">Scaled: ${calc.scaledL}</div>
          </div>
          <div style="background: rgba(255,255,255,0.08); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700;">STRUCTURE (35s/Q)</div>
            <div style="font-size: 1.1rem; font-weight: 800;">${counts.correctS}/${counts.totalS} Correct</div>
            <div style="font-size: 0.75rem; color: #93C5FD;">Scaled: ${calc.scaledS}</div>
          </div>
          <div style="background: rgba(255,255,255,0.08); padding: 10px; border-radius: 8px;">
            <div style="font-size: 0.72rem; color: #94A3B8; font-weight: 700;">READING (55s/Q)</div>
            <div style="font-size: 1.1rem; font-weight: 800;">${counts.correctR}/${counts.totalR} Correct</div>
            <div style="font-size: 0.75rem; color: #93C5FD;">Scaled: ${calc.scaledR}</div>
          </div>
        </div>

        <div class="calc-status-banner success">
          ✅ Home Trajectory Header Updated! Overall Accuracy: ${totalCorrect}/${simQuestions.length} (${totalAnswered} answered). Any missed questions were automatically added to your Smart Error Log.
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="button" class="btn btn-emerald" id="btn-report-go-home" style="flex: 1;">
            🏠 View Updated Home Trajectory (${calc.finalScore})
          </button>
          <button type="button" class="btn btn-primary" id="btn-report-go-review" style="flex: 1;">
            🚨 Review Missed Questions in Error Log
          </button>
          <button type="button" class="btn btn-outline" id="btn-report-retake" style="background: rgba(255,255,255,0.12); color: #FFF; border-color: rgba(255,255,255,0.25);">
            ↺ Retake Simulation
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-report-go-home').addEventListener('click', () => switchTab('home'));
    document.getElementById('btn-report-go-review').addEventListener('click', () => switchTab('review'));
    document.getElementById('btn-report-retake').addEventListener('click', () => {
      configureSimulasiSession(simMode, fullSectionFilter);
    });
  }

  function renderSimulasi() {
    const container = document.getElementById('simulasi-active-container');
    if (!container) return;

    if (simFinished) {
      finishSimulasiExam();
      return;
    }

    const q = simQuestions[simIndex];
    if (!q) return;

    const selected = simUserAnswers[q.id];
    const isFlagged = Boolean(simFlagged[q.id]);
    const targetSec = getTargetPacingSeconds(q);
    const isOverPace = simQuestionElapsedSec > targetSec;
    const letters = ['A', 'B', 'C', 'D'];

    const answeredCount = Object.keys(simUserAnswers).length;
    const flaggedCount = Object.keys(simFlagged).filter((k) => simFlagged[k]).length;

    // Optional Full Section Filter Row when in Full Section Timed Mode
    const fullSectionSelectorHtml =
      simMode === 'fullsection'
        ? `
          <div class="preset-row" style="margin-bottom: 12px;">
            <button type="button" class="preset-chip ${fullSectionFilter === 'all' ? 'active' : ''}" data-full-sec="all">
              All Sections Combined (${buildFullSectionQuestionPool('all').length} Qs • 35:00)
            </button>
            <button type="button" class="preset-chip ${fullSectionFilter === 'Structure' ? 'active' : ''}" data-full-sec="Structure">
              Section 2: Structure Timed (35s/Q • 25:00)
            </button>
            <button type="button" class="preset-chip ${fullSectionFilter === 'Reading' ? 'active' : ''}" data-full-sec="Reading">
              Section 3: Reading Timed (55s/Q • 55:00)
            </button>
            <button type="button" class="preset-chip ${fullSectionFilter === 'Listening' ? 'active' : ''}" data-full-sec="Listening">
              Section 1: Listening Timed (35s/Q • 35:00)
            </button>
          </div>
        `
        : '';

    // Build Question Navigator Grid (Flagged / Answered / Unanswered / Current)
    const navCellsHtml = simQuestions
      .map((item, idx) => {
        const isCurr = idx === simIndex;
        const isAns = typeof simUserAnswers[item.id] === 'number';
        const isFlg = Boolean(simFlagged[item.id]);
        const classes = [
          'q-nav-cell',
          isCurr ? 'current' : '',
          isAns ? 'answered' : '',
          isFlg ? 'flagged' : ''
        ]
          .filter(Boolean)
          .join(' ');
        return `<button type="button" class="${classes}" data-sim-jump="${idx}" title="Jump to Question ${idx + 1} (${item.section})">${idx + 1}</button>`;
      })
      .join('');

    let contextHtml = '';
    if (q.audioTranscript) {
      contextHtml = `
        <div class="audio-studio-box">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
            <div>
              <strong style="color: var(--accent-blue);">🎧 Section 1 Listening Audio Track</strong>
              <div style="font-size: 0.78rem; color: var(--text-secondary);">Listen carefully — transcript reveals after you answer.</div>
            </div>
            <button type="button" class="btn btn-primary btn-sm" id="btn-play-sim-audio">
              ▶ Play Dialogue Audio
            </button>
          </div>
          ${
            typeof selected === 'number'
              ? `<div class="transcript-revealed-box">
                   <div style="font-size: 0.74rem; font-weight: 800; text-transform: uppercase; color: var(--emerald-dark); margin-bottom: 4px;">
                     🔓 Audio Transcript
                   </div>
                   ${q.audioTranscript
                     .map((t) => `<div><strong>${t.speaker}:</strong> "${t.text}"</div>`)
                     .join('')}
                 </div>`
              : `<div class="transcript-locked-banner">
                   🔒 Transcript hidden during active test item — select your answer below to reveal.
                 </div>`
          }
        </div>
      `;
    } else if (q.passageSnippet) {
      contextHtml = `
        <div class="numbered-passage-box" style="margin-bottom: 14px;">
          <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--accent-blue); margin-bottom: 6px;">
            📖 Section 3 Reading Passage Extract (Target Pace: 55 Seconds)
          </div>
          ${q.passageSnippet}
        </div>
      `;
    }

    const optionsHtml = q.options
      .map((opt, idx) => {
        let cls = 'option-btn';
        if (typeof selected === 'number') {
          if (idx === q.correctIndex) cls += ' correct';
          else if (idx === selected) cls += ' incorrect';
        }
        return `
          <button type="button" class="${cls}" data-sim-opt="${idx}" ${typeof selected === 'number' ? 'disabled' : ''}>
            <span class="option-letter">${letters[idx]}</span>
            <span>${opt}</span>
          </button>
        `;
      })
      .join('');

    const explanationHtml =
      typeof selected === 'number' ? buildDiagnosticBreakdownHtml(q, selected) : '';

    container.innerHTML = `
      ${fullSectionSelectorHtml}

      <!-- Top Dashboard: Timers + Question Navigator Grid -->
      <div class="sim-top-dashboard">
        <div class="sim-timers-row">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span class="raw-pill" id="sim-overall-timer" style="font-size: 0.88rem;">
              ⏱️ Total: ${formatTimer(simTotalSecondsLeft)}
            </span>
            <span class="pacing-badge ${isOverPace ? 'over-pace' : ''}" id="sim-question-pace-badge">
              ⚡ Strict Pacing: ${simQuestionElapsedSec}s / ${targetSec}s (${q.section})
            </span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <span style="font-size: 0.76rem; font-weight: 700; color: var(--text-secondary);">
              ✓ ${answeredCount}/${simQuestions.length} Answered • 🚩 ${flaggedCount} Flagged
            </span>
            <button type="button" class="btn btn-emerald btn-sm" id="btn-submit-sim-early">
              Finish &amp; Score Report
            </button>
            <button type="button" class="btn btn-outline btn-sm" id="btn-restart-simulasi">
              ↺ Reset
            </button>
          </div>
        </div>

        <!-- Question Navigator Grid -->
        <div>
          <div style="font-size: 0.72rem; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">
            Question Navigator Grid (Tap number to jump • Blue = Answered • 🚩 = Flagged)
          </div>
          <div class="question-nav-grid">${navCellsHtml}</div>
        </div>
      </div>

      <!-- Question Header & Flag Toggle -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <span class="scaled-pill">${q.section}</span>
          <span class="raw-pill">${q.part || q.skill}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button type="button" class="btn ${isFlagged ? 'btn-coral' : 'btn-outline'} btn-sm" id="btn-toggle-flag">
            🚩 ${isFlagged ? 'Flagged for Review' : 'Flag Question'}
          </button>
          <span style="font-size: 0.82rem; font-weight: 800; color: var(--text-secondary);">
            Q${simIndex + 1} / ${simQuestions.length}
          </span>
        </div>
      </div>

      ${contextHtml}

      <div class="question-prompt-box" id="sim-prompt-box">
        ${buildInteractiveSentenceHtml(q, selected)}
      </div>

      <div class="options-grid">${optionsHtml}</div>

      ${explanationHtml}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; flex-wrap: wrap; gap: 10px;">
        <button type="button" class="btn btn-outline" id="btn-sim-prev" ${simIndex === 0 ? 'disabled' : ''}>
          &larr; Previous Question
        </button>
        <button type="button" class="btn btn-primary" id="btn-sim-next">
          ${
            simIndex === simQuestions.length - 1
              ? 'Submit &amp; View Score Report &rarr;'
              : 'Next Question &rarr;'
          }
        </button>
      </div>
    `;

    // Bind events
    container.querySelectorAll('[data-full-sec]').forEach((btn) => {
      btn.addEventListener('click', () => {
        configureSimulasiSession('fullsection', btn.getAttribute('data-full-sec'));
      });
    });

    container.querySelectorAll('[data-sim-jump]').forEach((btn) => {
      btn.addEventListener('click', () => {
        simIndex = Number(btn.getAttribute('data-sim-jump'));
        simQuestionElapsedSec = 0;
        renderSimulasi();
      });
    });

    const flagBtn = document.getElementById('btn-toggle-flag');
    if (flagBtn) {
      flagBtn.addEventListener('click', () => {
        simFlagged[q.id] = !simFlagged[q.id];
        renderSimulasi();
      });
    }

    const submitEarlyBtn = document.getElementById('btn-submit-sim-early');
    if (submitEarlyBtn) {
      submitEarlyBtn.addEventListener('click', () => finishSimulasiExam());
    }

    const restartBtn = document.getElementById('btn-restart-simulasi');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        configureSimulasiSession(simMode, fullSectionFilter);
        showToast('Simulation timer and questions reset.');
      });
    }

    const playBtn = document.getElementById('btn-play-sim-audio');
    if (playBtn && q.audioTranscript) {
      playBtn.addEventListener('click', () => speakDialogue(q.audioTranscript, 1.0));
    }

    const handleSimChoice = (chosen) => {
      simUserAnswers[q.id] = chosen;
      recordQuestionAttempt(q, chosen);
      renderSimulasi();
    };

    container.querySelectorAll('[data-inline-opt]').forEach((btn) => {
      btn.addEventListener('click', () =>
        handleSimChoice(Number(btn.getAttribute('data-inline-opt')))
      );
    });

    container.querySelectorAll('[data-sim-opt]').forEach((btn) => {
      btn.addEventListener('click', () =>
        handleSimChoice(Number(btn.getAttribute('data-sim-opt')))
      );
    });

    const prevBtn = document.getElementById('btn-sim-prev');
    const nextBtn = document.getElementById('btn-sim-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (simIndex > 0) {
          simIndex -= 1;
          simQuestionElapsedSec = 0;
          renderSimulasi();
        }
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (simIndex < simQuestions.length - 1) {
          simIndex += 1;
          simQuestionElapsedSec = 0;
          renderSimulasi();
        } else {
          finishSimulasiExam();
        }
      });
    }
  }

  function initSimulasiModule() {
    document.querySelectorAll('[data-sim-mode]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-sim-mode');
        document.querySelectorAll('[data-sim-mode]').forEach((b) => {
          b.classList.toggle('active', b.getAttribute('data-sim-mode') === mode);
        });
        configureSimulasiSession(mode, 'all');
      });
    });

    configureSimulasiSession('sprint15', 'all');
  }

  // =========================================================================
  // 12. MODULE 5: FLUENCY & LISTENING STUDIO (WEB SPEECH API)
  // =========================================================================

  let currentFluencySubtab = 'listening'; // 'listening' | 'shadowing'
  let listeningSimIndex = 0;
  let listeningSimAnswers = {};
  let listeningSimRate = 1.0;

  // Part 2: Active Shadowing & Speaking Fluency Coach State
  let shadowScriptIndex = 0;
  let shadowTtsRate = 1.0;
  let recognitionInstance = null;
  let isRecordingShadow = false;
  let shadowStartTime = null;
  let shadowMatchedIndices = new Set();
  let shadowTotalSpokenWords = 0;
  let shadowCurrentWpm = 0;
  let shadowLiveTranscript = '';
  let demoShadowInterval = null;

  function switchFluencySubtab(subtab) {
    currentFluencySubtab = subtab;
    document.querySelectorAll('[data-fluency-tab]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-fluency-tab') === subtab);
    });

    const listPane = document.getElementById('fluency-listening-pane');
    const shadPane = document.getElementById('fluency-shadowing-pane');
    if (listPane) listPane.style.display = subtab === 'listening' ? 'block' : 'none';
    if (shadPane) shadPane.style.display = subtab === 'shadowing' ? 'block' : 'none';

    if (subtab === 'listening') renderListeningSimulator();
    if (subtab === 'shadowing') renderShadowingCoach();
  }

  // --- PART 1: TOEFL LISTENING SIMULATOR (Part A Short Dialogues & Part C Lectures) ---

  function renderListeningSimulator() {
    const container = document.getElementById('fluency-listening-pane');
    if (!container) return;

    const item = FLUENCY_LISTENING_SIMULATOR[listeningSimIndex];
    if (!item) return;

    const selected = listeningSimAnswers[item.id];
    const isAnswered = typeof selected === 'number';
    const letters = ['A', 'B', 'C', 'D'];

    const itemPillsHtml = FLUENCY_LISTENING_SIMULATOR.map((ls, idx) => {
      const ans = listeningSimAnswers[ls.id];
      const dot = typeof ans === 'number' ? (ans === ls.correctIndex ? ' ✓' : ' ✗') : '';
      return `
        <button type="button" class="preset-chip ${idx === listeningSimIndex ? 'active' : ''}" data-lsim-jump="${idx}">
          Track ${idx + 1}: ${ls.partType.split('•')[0].trim()}${dot}
        </button>
      `;
    }).join('');

    const transcriptSectionHtml = isAnswered
      ? `
        <div class="transcript-revealed-box">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 6px;">
            <span class="section-eyebrow" style="margin-bottom: 0; background: var(--emerald-soft); color: var(--emerald-dark);">
              🔓 Full Audio Transcript &amp; Idiom Breakdown (Revealed)
            </span>
          </div>
          <div style="margin-bottom: 10px;">
            ${item.audioLines
              .map(
                (line) =>
                  `<div style="margin-bottom: 6px;"><strong>${line.speaker}:</strong> "${line.text}"</div>`
              )
              .join('')}
          </div>
          <div style="padding: 10px 12px; background: var(--bg-slate); border-radius: var(--radius-sm); border-left: 3px solid var(--accent-blue); font-size: 0.84rem;">
            <div><strong>💡 Idiom &amp; Expression Spotlight:</strong> ${item.idiomSpotlight}</div>
            <div style="margin-top: 4px;"><strong>🎵 Academic Tone &amp; Intonation:</strong> ${item.toneNotes}</div>
          </div>
        </div>
      `
      : `
        <div class="transcript-locked-banner">
          <span>🔒 <strong>Transcript Hidden Initially:</strong> Press <strong>"▶ Play Audio"</strong> to listen via <code>window.speechSynthesis</code>, then answer the question below to unlock the transcript &amp; idiom breakdown.</span>
        </div>
      `;

    const optionsHtml = item.options
      .map((opt, oIdx) => {
        let cls = 'option-btn';
        if (isAnswered) {
          if (oIdx === item.correctIndex) cls += ' correct';
          else if (oIdx === selected) cls += ' incorrect';
        }
        return `
          <button type="button" class="${cls}" data-lsim-opt="${oIdx}" ${isAnswered ? 'disabled' : ''}>
            <span class="option-letter">${letters[oIdx]}</span>
            <span>${opt}</span>
          </button>
        `;
      })
      .join('');

    const feedbackHtml = isAnswered
      ? `
        <div class="diagnostic-card ${selected === item.correctIndex ? 'correct' : 'incorrect'}">
          <div class="diagnostic-header">
            <div class="diagnostic-status-title">
              ${
                selected === item.correctIndex
                  ? '✓ Correct Comprehension!'
                  : '✗ Missed Implied Meaning (Logged to Smart Error Log)'
              }
            </div>
            <span class="diagnostic-skill-pill">${item.skill}</span>
          </div>
          <div style="font-size: 0.9rem;">${item.explanation}</div>
        </div>
      `
      : '';

    container.innerHTML = `
      <!-- AI Infinite Question Generator Bar (Listening) -->
      <div class="ai-generator-bar">
        <div class="ai-generator-info">
          <div class="ai-generator-title">
            <span>✨ AI Infinite TOEFL Listening Generator (Part A &amp; Part C)</span>
          </div>
          <div class="ai-generator-sub">
            Powered by Gemini 2.5 Flash • Generates 5 new dialogues &amp; lectures targeting your <code>error_log</code> skills
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
          <button type="button" class="btn btn-ai-generate btn-sm" id="btn-generate-listening-drill">
            ✨ Generate New Daily Drill (5 Qs)
          </button>
          <button type="button" class="btn btn-outline btn-sm" data-open-settings title="Configure Gemini API Key">
            ⚙️ API Key
          </button>
        </div>
      </div>
      <div class="ai-error-alert" id="ai-listen-error-alert"></div>

      <div class="preset-row">${itemPillsHtml}</div>

      <div class="audio-studio-box">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
          <div>
            <span class="scaled-pill">${item.partType}</span>
            <span class="raw-pill" style="margin-left: 6px;">${item.focusCategory}</span>
            <h3 style="font-size: 1.05rem; font-weight: 800; margin-top: 8px;">${item.title}</h3>
          </div>

          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="font-size: 0.75rem; font-weight: 700;">Speed:</span>
              <button type="button" class="preset-chip ${listeningSimRate === 0.85 ? 'active' : ''}" data-lsim-rate="0.85">0.85x</button>
              <button type="button" class="preset-chip ${listeningSimRate === 1.0 ? 'active' : ''}" data-lsim-rate="1.0">1.0x</button>
              <button type="button" class="preset-chip ${listeningSimRate === 1.15 ? 'active' : ''}" data-lsim-rate="1.15">1.15x</button>
            </div>
            <button type="button" class="btn btn-primary" id="btn-lsim-play">
              ▶ Play Audio (${listeningSimRate}x)
            </button>
            <button type="button" class="btn btn-outline btn-sm" id="btn-lsim-stop">
              ⏹ Stop
            </button>
          </div>
        </div>

        ${transcriptSectionHtml}
      </div>

      <div class="question-prompt-box">${item.question}</div>
      <div class="options-grid">${optionsHtml}</div>
      ${feedbackHtml}

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; flex-wrap: wrap; gap: 10px;">
        <button type="button" class="btn btn-outline" id="btn-lsim-prev">&larr; Previous Track</button>
        <button type="button" class="btn btn-outline btn-sm" id="btn-lsim-reset">↺ Reset Track (Hide Transcript)</button>
        <button type="button" class="btn btn-primary" id="btn-lsim-next">Next Track &rarr;</button>
      </div>
    `;

    container.querySelectorAll('[data-lsim-jump]').forEach((btn) => {
      btn.addEventListener('click', () => {
        listeningSimIndex = Number(btn.getAttribute('data-lsim-jump'));
        renderListeningSimulator();
      });
    });

    container.querySelectorAll('[data-lsim-rate]').forEach((btn) => {
      btn.addEventListener('click', () => {
        listeningSimRate = Number(btn.getAttribute('data-lsim-rate'));
        renderListeningSimulator();
      });
    });

    document.getElementById('btn-lsim-play').addEventListener('click', () => {
      speakDialogue(item.audioLines, listeningSimRate);
    });

    document.getElementById('btn-lsim-stop').addEventListener('click', () => {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    });

    container.querySelectorAll('[data-lsim-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const chosen = Number(btn.getAttribute('data-lsim-opt'));
        listeningSimAnswers[item.id] = chosen;
        recordQuestionAttempt(
          Object.assign({ section: `Listening ${item.partType}` }, item),
          chosen
        );
        renderListeningSimulator();
      });
    });

    document.getElementById('btn-lsim-reset').addEventListener('click', () => {
      delete listeningSimAnswers[item.id];
      renderListeningSimulator();
    });

    document.getElementById('btn-lsim-prev').addEventListener('click', () => {
      listeningSimIndex =
        (listeningSimIndex - 1 + FLUENCY_LISTENING_SIMULATOR.length) %
        FLUENCY_LISTENING_SIMULATOR.length;
      renderListeningSimulator();
    });

    document.getElementById('btn-lsim-next').addEventListener('click', () => {
      listeningSimIndex = (listeningSimIndex + 1) % FLUENCY_LISTENING_SIMULATOR.length;
      renderListeningSimulator();
    });

    const genListenBtn = document.getElementById('btn-generate-listening-drill');
    if (genListenBtn) {
      genListenBtn.addEventListener('click', () => {
        generateAiDailyDrill('listening');
      });
    }

    container.querySelectorAll('[data-open-settings]').forEach((btn) => {
      btn.addEventListener('click', openAiSettingsModal);
    });
  }

  // --- PART 2: ACTIVE SHADOWING & SPEAKING FLUENCY COACH ---

  function normalizeWord(w) {
    return (w || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function getScriptWordsArray(scriptObj) {
    return scriptObj.targetText.split(/\s+/).filter(Boolean);
  }

  function processSpokenTranscript(transcriptText) {
    const script = FLUENCY_SHADOWING_SCRIPTS[shadowScriptIndex];
    if (!script) return;

    shadowLiveTranscript = transcriptText;
    const targetWords = getScriptWordsArray(script);
    const spokenWords = transcriptText
      .split(/\s+/)
      .map(normalizeWord)
      .filter(Boolean);

    shadowTotalSpokenWords = spokenWords.length;

    // Match spoken words against target words
    const spokenSet = new Set(spokenWords);
    targetWords.forEach((tw, idx) => {
      const cleanTarget = normalizeWord(tw);
      if (cleanTarget && spokenSet.has(cleanTarget)) {
        shadowMatchedIndices.add(idx);
      }
    });

    // Calculate live WPM
    if (shadowStartTime) {
      const elapsedMinutes = Math.max(0.05, (Date.now() - shadowStartTime) / 60000);
      shadowCurrentWpm = Math.round(
        Math.max(shadowMatchedIndices.size, spokenWords.length) / elapsedMinutes
      );
    }

    updateShadowingDOM();
  }

  function stopShadowingSession() {
    isRecordingShadow = false;
    if (recognitionInstance) {
      try {
        recognitionInstance.stop();
      } catch (e) {}
      recognitionInstance = null;
    }
    if (demoShadowInterval) {
      clearInterval(demoShadowInterval);
      demoShadowInterval = null;
    }
    renderShadowingCoach();
  }

  function startSpeechRecognitionShadowing() {
    if (isRecordingShadow) {
      stopShadowingSession();
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      showToast(
        '🎙️ Browser SpeechRecognition unavailable — launching interactive real-time Shadowing Simulator!'
      );
      startSimulatedShadowing();
      return;
    }

    shadowMatchedIndices.clear();
    shadowTotalSpokenWords = 0;
    shadowCurrentWpm = 0;
    shadowLiveTranscript = '';
    shadowStartTime = Date.now();
    isRecordingShadow = true;

    recognitionInstance = new SpeechRec();
    recognitionInstance.lang = 'en-US';
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;

    recognitionInstance.onresult = (event) => {
      let combined = '';
      for (let i = 0; i < event.results.length; i++) {
        combined += ' ' + event.results[i][0].transcript;
      }
      processSpokenTranscript(combined.trim());
    };

    recognitionInstance.onerror = () => {
      showToast('Mic permission or speech recognition interrupted — switching to Demo Shadowing.');
      stopShadowingSession();
      startSimulatedShadowing();
    };

    recognitionInstance.onend = () => {
      if (isRecordingShadow) {
        isRecordingShadow = false;
        renderShadowingCoach();
      }
    };

    try {
      recognitionInstance.start();
      renderShadowingCoach();
      showToast('🎙️ Microphone Active! Read the paragraph aloud now.');
    } catch (err) {
      startSimulatedShadowing();
    }
  }

  function startSimulatedShadowing() {
    if (demoShadowInterval) clearInterval(demoShadowInterval);
    const script = FLUENCY_SHADOWING_SCRIPTS[shadowScriptIndex];
    const words = getScriptWordsArray(script);

    shadowMatchedIndices.clear();
    shadowStartTime = Date.now();
    isRecordingShadow = true;
    let cursor = 0;
    let builtTranscript = [];

    renderShadowingCoach();

    demoShadowInterval = setInterval(() => {
      if (cursor < words.length) {
        builtTranscript.push(words[cursor]);
        shadowMatchedIndices.add(cursor);
        cursor += 1;
        shadowLiveTranscript = builtTranscript.join(' ');
        const elapsedMin = Math.max(0.03, (Date.now() - shadowStartTime) / 60000);
        shadowCurrentWpm = Math.min(165, Math.max(125, Math.round((cursor / elapsedMin) * 0.62)));
        updateShadowingDOM();
      } else {
        stopShadowingSession();
        showToast('🎉 100% Shadowing Match Achieved!');
      }
    }, 260);
  }

  function updateShadowingDOM() {
    const script = FLUENCY_SHADOWING_SCRIPTS[shadowScriptIndex];
    if (!script) return;
    const words = getScriptWordsArray(script);
    const matchPct =
      words.length > 0 ? Math.round((shadowMatchedIndices.size / words.length) * 100) : 0;

    const pctEl = document.getElementById('shadow-match-pct');
    const wpmEl = document.getElementById('shadow-wpm-val');
    const countEl = document.getElementById('shadow-words-count');
    const liveTransEl = document.getElementById('shadow-live-transcript');

    if (pctEl) pctEl.textContent = `${matchPct}%`;
    if (wpmEl) wpmEl.textContent = `${shadowCurrentWpm}`;
    if (countEl) countEl.textContent = `${shadowMatchedIndices.size} / ${words.length}`;
    if (liveTransEl && shadowLiveTranscript) {
      liveTransEl.textContent = `"${shadowLiveTranscript}"`;
    }

    document.querySelectorAll('[data-shadow-word-idx]').forEach((span) => {
      const wIdx = Number(span.getAttribute('data-shadow-word-idx'));
      span.classList.toggle('matched', shadowMatchedIndices.has(wIdx));
    });
  }

  function renderShadowingCoach() {
    const container = document.getElementById('fluency-shadowing-pane');
    if (!container) return;

    const script = FLUENCY_SHADOWING_SCRIPTS[shadowScriptIndex];
    if (!script) return;

    const words = getScriptWordsArray(script);
    const matchPct =
      words.length > 0 ? Math.round((shadowMatchedIndices.size / words.length) * 100) : 0;

    const scriptPills = FLUENCY_SHADOWING_SCRIPTS.map(
      (s, idx) => `
        <button type="button" class="preset-chip ${idx === shadowScriptIndex ? 'active' : ''}" data-shad-script="${idx}">
          Script ${idx + 1}: ${s.title.split(':')[0]}
        </button>
      `
    ).join('');

    const wordSpansHtml = words
      .map((w, idx) => {
        const isMatched = shadowMatchedIndices.has(idx);
        return `<span class="shadow-word ${isMatched ? 'matched' : ''}" data-shadow-word-idx="${idx}">${w}</span>`;
      })
      .join(' ');

    container.innerHTML = `
      <div class="preset-row">${scriptPills}</div>

      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; margin-bottom: 12px;">
        <div>
          <span class="scaled-pill">${script.category}</span>
          <span class="raw-pill" style="margin-left: 6px;">Target: ~${script.recommendedWpm} WPM</span>
          <h3 style="font-size: 1.06rem; font-weight: 800; margin-top: 6px;">${script.title}</h3>
          <div style="font-size: 0.8rem; color: var(--accent-blue); font-weight: 700; margin-top: 2px;">
            💡 Prosody &amp; Intonation Guide: ${script.ipaGuide}
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
          <span style="font-size: 0.76rem; font-weight: 700;">TTS Speed:</span>
          <button type="button" class="preset-chip ${shadowTtsRate === 0.85 ? 'active' : ''}" data-shad-rate="0.85">0.85x</button>
          <button type="button" class="preset-chip ${shadowTtsRate === 1.0 ? 'active' : ''}" data-shad-rate="1.0">1.0x</button>
          <button type="button" class="preset-chip ${shadowTtsRate === 1.15 ? 'active' : ''}" data-shad-rate="1.15">1.15x</button>
        </div>
      </div>

      <!-- Step 1 & Step 2 Controls -->
      <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 16px;">
        <button type="button" class="btn btn-outline" id="btn-step1-listen">
          🔊 Step 1: Listen to Native TTS (${shadowTtsRate}x)
        </button>

        <button type="button" class="btn ${isRecordingShadow ? 'btn-coral' : 'btn-primary'}" id="btn-step2-record">
          ${
            isRecordingShadow
              ? '<span class="rec-pulse-dot"></span> Stop Recording &amp; Shadowing'
              : '🎙️ Step 2: Record &amp; Shadow (Web Speech API)'
          }
        </button>

        <button type="button" class="btn btn-emerald btn-sm" id="btn-step2-demo" title="Test real-time green word matching and WPM calculation">
          ⚡ Auto-Demo Live Match
        </button>

        <button type="button" class="btn btn-outline btn-sm" id="btn-shadow-reset">
          ↺ Reset Words
        </button>
      </div>

      <!-- Target Script with Real-Time Green Word Highlighting -->
      <div class="shadow-target-script" id="shadow-target-box">
        ${wordSpansHtml}
      </div>

      <!-- Real-Time Fluency & Pronunciation Metrics -->
      <div class="fluency-metrics-row">
        <div class="fluency-metric-card">
          <div class="metric-label">Fluency &amp; Pronunciation Match</div>
          <div class="fluency-metric-val emerald" id="shadow-match-pct">${matchPct}%</div>
          <span class="metric-cefr">Target: 85%+ Accuracy</span>
        </div>

        <div class="fluency-metric-card">
          <div class="metric-label">Speaking Speed (WPM)</div>
          <div class="fluency-metric-val" id="shadow-wpm-val">${shadowCurrentWpm}</div>
          <span class="metric-cefr">Words Per Minute (Goal: ${script.recommendedWpm})</span>
        </div>

        <div class="fluency-metric-card">
          <div class="metric-label">Words Pronounced</div>
          <div class="fluency-metric-val" id="shadow-words-count">${shadowMatchedIndices.size} / ${words.length}</div>
          <span class="metric-cefr">Green Highlighted Tokens</span>
        </div>
      </div>

      <div style="padding: 12px 14px; background: var(--bg-slate); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.84rem; color: var(--text-secondary);">
        <strong>🎙️ Live Recognized Speech Stream:</strong>
        <span id="shadow-live-transcript" style="margin-left: 6px; font-style: italic;">
          ${shadowLiveTranscript ? `"${shadowLiveTranscript}"` : 'Tap "Record & Shadow" and speak the paragraph above aloud...'}
        </span>
      </div>
    `;

    container.querySelectorAll('[data-shad-script]').forEach((btn) => {
      btn.addEventListener('click', () => {
        stopShadowingSession();
        shadowScriptIndex = Number(btn.getAttribute('data-shad-script'));
        shadowMatchedIndices.clear();
        shadowCurrentWpm = 0;
        shadowLiveTranscript = '';
        renderShadowingCoach();
      });
    });

    container.querySelectorAll('[data-shad-rate]').forEach((btn) => {
      btn.addEventListener('click', () => {
        shadowTtsRate = Number(btn.getAttribute('data-shad-rate'));
        renderShadowingCoach();
      });
    });

    document.getElementById('btn-step1-listen').addEventListener('click', () => {
      if (!('speechSynthesis' in window)) {
        showToast('Speech synthesis unavailable.');
        return;
      }
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(script.targetText);
      utter.lang = 'en-US';
      utter.rate = shadowTtsRate;
      window.speechSynthesis.speak(utter);
    });

    document.getElementById('btn-step2-record').addEventListener('click', () => {
      startSpeechRecognitionShadowing();
    });

    document.getElementById('btn-step2-demo').addEventListener('click', () => {
      startSimulatedShadowing();
    });

    document.getElementById('btn-shadow-reset').addEventListener('click', () => {
      stopShadowingSession();
      shadowMatchedIndices.clear();
      shadowCurrentWpm = 0;
      shadowLiveTranscript = '';
      renderShadowingCoach();
    });
  }

  function initFluencyModule() {
    document.querySelectorAll('[data-fluency-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        switchFluencySubtab(btn.getAttribute('data-fluency-tab'));
      });
    });

    const completeHabitBtn = document.getElementById('btn-complete-fluency-habit');
    if (completeHabitBtn) {
      completeHabitBtn.addEventListener('click', () => {
        toggleHabit('habit_fluency', true);
      });
    }

    renderListeningSimulator();
    renderShadowingCoach();
  }

  // =========================================================================
  // 13. MODULE 6: AI INFINITE QUESTION GENERATOR (GEMINI 2.5 FLASH API)
  // =========================================================================

  const GEMINI_KEY_STORAGE = 'gemini_api_key';
  const AI_DIFFICULTY_STORAGE = 'roadTo600_ai_difficulty_focus';
  const AI_CACHE_STRUCTURE_KEY = 'roadTo600_ai_cached_structure';
  const AI_CACHE_READING_KEY = 'roadTo600_ai_cached_reading';
  const AI_CACHE_LISTENING_KEY = 'roadTo600_ai_cached_listening';

  function getGeminiApiKey() {
    try {
      return (localStorage.getItem(GEMINI_KEY_STORAGE) || '').trim();
    } catch (e) {
      return '';
    }
  }

  function getAiDifficultyFocus() {
    try {
      return (
        localStorage.getItem(AI_DIFFICULTY_STORAGE) ||
        'Mastery 550 to 600+ (Hard Traps)'
      );
    } catch (e) {
      return 'Mastery 550 to 600+ (Hard Traps)';
    }
  }

  function getWeakestSkillsSummary() {
    const skillCounts = {};
    errorLog.forEach((item) => {
      const sk = item.skill || item.section || 'Inversion & Parallel Structure';
      skillCounts[sk] = (skillCounts[sk] || 0) + 1;
    });

    const sortedFromErrorLog = Object.keys(skillCounts).sort(
      (a, b) => skillCounts[b] - skillCounts[a]
    );

    if (sortedFromErrorLog.length > 0) {
      return sortedFromErrorLog.slice(0, 4).join('; ');
    }
    return 'Skill 15: Inversion with Negative Expressions; Skill 13: Reduced Adjective Clauses; Skill 35: Subjunctive; Skill 24: Parallel Structure; Academic Inference';
  }

  function loadCachedAiQuestionsOffline() {
    try {
      const cachedStr = JSON.parse(localStorage.getItem(AI_CACHE_STRUCTURE_KEY) || '[]');
      if (Array.isArray(cachedStr) && cachedStr.length > 0) {
        const existingIds = new Set(state.questionsDatabase.map((q) => q.id));
        cachedStr.forEach((q) => {
          if (q && q.id && !existingIds.has(q.id)) {
            state.questionsDatabase.push(q);
          }
        });
      }

      const cachedRead = JSON.parse(localStorage.getItem(AI_CACHE_READING_KEY) || '[]');
      if (Array.isArray(cachedRead) && cachedRead.length > 0) {
        const existingPassageIds = new Set(READING_PASSAGES.map((p) => p.id));
        cachedRead.forEach((p) => {
          if (p && p.id && !existingPassageIds.has(p.id)) {
            READING_PASSAGES.push(p);
          }
        });
      }

      const cachedListen = JSON.parse(localStorage.getItem(AI_CACHE_LISTENING_KEY) || '[]');
      if (Array.isArray(cachedListen) && cachedListen.length > 0) {
        const existingListenIds = new Set(FLUENCY_LISTENING_SIMULATOR.map((l) => l.id));
        cachedListen.forEach((l) => {
          if (l && l.id && !existingListenIds.has(l.id)) {
            FLUENCY_LISTENING_SIMULATOR.push(l);
          }
        });
      }
    } catch (e) {}
  }

  function appendToAiLocalStorageCache(storageKey, newItems) {
    try {
      const existing = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const combined = Array.isArray(existing) ? [...existing, ...newItems] : newItems;
      localStorage.setItem(storageKey, JSON.stringify(combined.slice(-40)));
    } catch (e) {}
  }

  function updateAiSettingsUI() {
    const key = getGeminiApiKey();
    const diff = getAiDifficultyFocus();
    const weakSummary = getWeakestSkillsSummary();

    document.querySelectorAll('.gear-settings-btn').forEach((btn) => {
      btn.classList.toggle('key-configured', Boolean(key));
    });

    const desktopGear = document.getElementById('desktop-gear-btn');
    if (desktopGear) {
      desktopGear.textContent = key
        ? '⚙️ AI Ready (Gemini Key Saved)'
        : '⚙️ AI Generator Settings';
    }

    const focusBadge = document.getElementById('desktop-ai-focus-badge');
    if (focusBadge) {
      focusBadge.textContent = `🎯 Focus: ${diff}`;
    }

    const strHint = document.getElementById('ai-str-weakness-hint');
    if (strHint) {
      strHint.innerHTML = `Target Focus: <strong>${diff}</strong> • Weaknesses: <em>${weakSummary}</em>`;
    }

    const modalWeakPreview = document.getElementById('modal-weak-skills-preview');
    if (modalWeakPreview) {
      modalWeakPreview.textContent = weakSummary;
    }

    const keyInput = document.getElementById('input-gemini-api-key');
    if (keyInput) {
      keyInput.value = key;
    }

    document.querySelectorAll('[data-diff-card]').forEach((card) => {
      const val = card.getAttribute('data-diff-card');
      const isSel = val === diff;
      card.classList.toggle('selected', isSel);
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = isSel;
    });
  }

  function openAiSettingsModal() {
    updateAiSettingsUI();
    const modal = document.getElementById('ai-settings-modal');
    if (modal) modal.classList.add('open');
  }

  function closeAiSettingsModal() {
    const modal = document.getElementById('ai-settings-modal');
    if (modal) modal.classList.remove('open');
  }

  function showAiErrorBanner(alertElementId, message, showSettingsButton) {
    const el = document.getElementById(alertElementId);
    if (!el) return;
    el.classList.add('visible');
    el.innerHTML = `
      <span>⚠️ ${message}</span>
      ${
        showSettingsButton
          ? `<button type="button" class="btn btn-outline btn-sm" data-open-modal-from-err>⚙️ Open AI Settings</button>`
          : ''
      }
    `;
    const openBtn = el.querySelector('[data-open-modal-from-err]');
    if (openBtn) {
      openBtn.addEventListener('click', openAiSettingsModal);
    }
  }

  function hideAiErrorBanner(alertElementId) {
    const el = document.getElementById(alertElementId);
    if (el) {
      el.classList.remove('visible');
      el.innerHTML = '';
    }
  }

  function cleanJsonText(rawText) {
    return (rawText || '')
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
  }

  async function generateAiDailyDrill(targetModule) {
    const alertId =
      targetModule === 'structure'
        ? 'ai-str-error-alert'
        : targetModule === 'reading'
        ? 'ai-read-error-alert'
        : 'ai-listen-error-alert';

    const btnId =
      targetModule === 'structure'
        ? 'btn-generate-structure-drill'
        : targetModule === 'reading'
        ? 'btn-generate-reading-drill'
        : 'btn-generate-listening-drill';

    hideAiErrorBanner(alertId);

    const apiKey = getGeminiApiKey();
    if (!apiKey) {
      showAiErrorBanner(
        alertId,
        'Gemini API Key is missing! Click "Open AI Settings" (top-right gear icon) to save your key in localStorage.',
        true
      );
      openAiSettingsModal();
      showToast('🔑 Please enter your Gemini API Key in Settings first.');
      return;
    }

    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      showAiErrorBanner(
        alertId,
        'You appear to be offline. Previously generated AI drills remain saved in your localStorage session.',
        false
      );
      showToast('📴 Offline: Cannot reach Gemini API right now.');
      return;
    }

    const btn = document.getElementById(btnId);
    const originalBtnHtml = btn ? btn.innerHTML : '✨ Generate New Daily Drill (5 Qs)';
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = `<span class="ai-spinner"></span> Generating 5 Questions via Gemini...`;
    }

    const difficultyFocus = getAiDifficultyFocus();
    const weakestSkills = getWeakestSkillsSummary();
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
      apiKey
    )}`;

    const systemPrompt =
      'You are an official ETS TOEFL ITP Level 1 Test Designer and Deborah Phillips (author of Longman Preparation Course for the TOEFL Test). ' +
      'You design rigorous, authentic academic American English questions calibrated for a learner progressing from 497 to 600+. ' +
      'Always respond ONLY with valid, parseable JSON matching the requested schema with zero markdown wrappers or extra commentary.';

    let userPrompt = '';
    if (targetModule === 'structure') {
      userPrompt = `Generate a strict JSON array of exactly 5 new TOEFL ITP Section 2 (Structure & Written Expression) questions.
Difficulty Focus: "${difficultyFocus}".
Tailor the 5 questions specifically to the user's weakest skills from error_log: "${weakestSkills}" (e.g., Inversion with Negative Expressions, Conditional Inversion, Reduced Adjective Clauses, Subjunctive Mood, Parallel Structure with Comparisons/Paired Conjunctions, Subject-Verb Agreement after Prepositional Phrases).
Include a mix of "Structure Part A" (sentence completion with _______) and "Structure Part B (Error Recognition)" (where the question sentence contains [A] word/phrase, [B] word/phrase, [C] word/phrase, [D] word/phrase and the options array matches ["[A] ...", "[B] ...", "[C] ...", "[D] ..."]).

Return ONLY a valid JSON array of 5 objects with this exact structure:
[
  {
    "section": "Structure Part A" or "Structure Part B (Error Recognition)",
    "skill": "Skill XX: Specific Longman Skill Title",
    "question": "Full sentence question...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Clear grammatical rule explanation...",
    "structuralAnalysis": {
      "mainSubject": "Explicit main subject of the sentence",
      "mainVerb": "Explicit main verb of the sentence",
      "optionBreakdown": [
        "A: Why right or wrong",
        "B: Why right or wrong",
        "C: Why right or wrong",
        "D: Why right or wrong"
      ]
    }
  }
]`;
    } else if (targetModule === 'reading') {
      userPrompt = `Generate a strict JSON object representing a new TOEFL ITP Section 3 Academic Reading Passage with 14 to 16 lines, 5 Academic Word List (AWL) vocabulary items appearing in the text, and 5 comprehension questions tailored to "${difficultyFocus}" and weaknesses "${weakestSkills}" (Academic Inference, Vocabulary in Context, Factual Detail, Negative Factual Detail EXCEPT, Rhetorical Purpose).

Return ONLY a valid JSON object with this exact structure:
{
  "title": "Academic Passage Title",
  "topic": "Academic Discipline • AI Daily Drill",
  "lines": [
    "Line 1 text (around 10-12 words per line)...",
    "Line 2 text..."
  ],
  "awlWords": [
    {
      "word": "headword",
      "partOfSpeech": "verb/noun/adj/adv",
      "phonetic": "/IPA/",
      "lineRef": "Line X",
      "toeflSynonym": "synonym 1 / synonym 2",
      "meaning": "Academic definition",
      "contextQuote": "Quote from passage"
    }
  ],
  "questions": [
    {
      "skill": "Reading: Academic Inference (or Vocabulary in Context, etc.)",
      "question": "Question text...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed explanation of why the answer is supported by the text."
    }
  ]
}`;
    } else {
      userPrompt = `Generate a strict JSON array of 5 new TOEFL ITP Section 1 Listening Comprehension items (mix of "Part A • Short Dialogue" and "Part C • Academic Lecture") tailored to "${difficultyFocus}" and weaknesses "${weakestSkills}" (Idiomatic Expressions, Implied Meaning, Second-Order Conditionals, Academic Tone).

Return ONLY a valid JSON array of 5 objects with this exact structure:
[
  {
    "partType": "Part A • Short Dialogue" or "Part C • Academic Lecture",
    "focusCategory": "Idiomatic Expressions & Implied Meaning",
    "title": "Short descriptive title",
    "audioLines": [
      { "speaker": "Woman", "text": "..." },
      { "speaker": "Man", "text": "..." },
      { "speaker": "Narrator", "text": "What does the man mean?" }
    ],
    "question": "What does the man mean?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "skill": "Listening Skill: Specific Skill Name",
    "idiomSpotlight": "Explanation of the key idiom or academic discourse marker used",
    "toneNotes": "Intonation and speaker attitude notes",
    "explanation": "Why the correct option matches the speaker's implied meaning."
  }
]`;
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: userPrompt }]
            }
          ],
          generationConfig: {
            responseMimeType: 'application/json',
            temperature: 0.7
          }
        })
      });

      if (!response.ok) {
        let errDetail = `HTTP ${response.status}`;
        try {
          const errJson = await response.json();
          if (errJson && errJson.error && errJson.error.message) {
            errDetail = errJson.error.message;
          }
        } catch (e) {}
        throw new Error(errDetail);
      }

      const data = await response.json();
      const rawOutput =
        data &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
          ? data.candidates[0].content.parts[0].text
          : '';

      if (!rawOutput) {
        throw new Error('Gemini returned an empty response.');
      }

      const parsed = JSON.parse(cleanJsonText(rawOutput));
      const timestamp = Date.now();

      if (targetModule === 'structure') {
        const arr = Array.isArray(parsed) ? parsed : parsed.questions || [];
        if (arr.length === 0) throw new Error('No Structure questions found in JSON.');

        const startIdx = state.questionsDatabase.length;
        const normalizedItems = arr.slice(0, 5).map((q, idx) => ({
          id: `ai-str-${timestamp}-${idx + 1}`,
          section: q.section || 'Structure Part A',
          skill: q.skill || 'AI Targeted TOEFL Skill',
          question: q.question || '',
          options: Array.isArray(q.options) ? q.options.slice(0, 4) : ['A', 'B', 'C', 'D'],
          correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
          explanation: q.explanation || '',
          structuralAnalysis: q.structuralAnalysis || {
            mainSubject: 'Identified in explanation',
            mainVerb: 'Identified in explanation',
            optionBreakdown: []
          }
        }));

        state.questionsDatabase.push(...normalizedItems);
        state.currentStructureIndex = startIdx;
        appendToAiLocalStorageCache(AI_CACHE_STRUCTURE_KEY, normalizedItems);
        saveState();
        renderStructureDrill();
        showToast(`✨ Added ${normalizedItems.length} new AI Structure questions (saved for offline use)!`);
      } else if (targetModule === 'reading') {
        const passageObj = Array.isArray(parsed) ? parsed[0] : parsed;
        if (!passageObj || !Array.isArray(passageObj.questions)) {
          throw new Error('Invalid Reading passage JSON structure.');
        }

        const newPassage = {
          id: `ai-read-${timestamp}`,
          title: passageObj.title || 'AI Generated Academic Reading Drill',
          topic: passageObj.topic || `AI Daily Drill • ${difficultyFocus}`,
          lines: Array.isArray(passageObj.lines)
            ? passageObj.lines
            : ['Academic passage generated by Gemini.'],
          awlWords: (passageObj.awlWords || []).slice(0, 5).map((w, idx) => ({
            id: `ai-awl-${timestamp}-${idx + 1}`,
            word: w.word || 'academic',
            partOfSpeech: w.partOfSpeech || 'term',
            phonetic: w.phonetic || '',
            lineRef: w.lineRef || `Line ${idx + 2}`,
            toeflSynonym: w.toeflSynonym || '',
            meaning: w.meaning || '',
            contextQuote: w.contextQuote || ''
          })),
          questions: (passageObj.questions || []).slice(0, 5).map((rq, idx) => ({
            id: `ai-rq-${timestamp}-${idx + 1}`,
            skill: rq.skill || 'Reading: Academic Comprehension',
            question: rq.question || '',
            options: Array.isArray(rq.options) ? rq.options.slice(0, 4) : ['A', 'B', 'C', 'D'],
            correctIndex: typeof rq.correctIndex === 'number' ? rq.correctIndex : 0,
            explanation: rq.explanation || ''
          }))
        };

        READING_PASSAGES.push(newPassage);
        state.currentPassageIndex = READING_PASSAGES.length - 1;
        appendToAiLocalStorageCache(AI_CACHE_READING_KEY, [newPassage]);
        saveState();
        renderReadingDrill();
        showToast('✨ Generated new Academic Passage + 5 AWL Words + 5 Questions!');
      } else if (targetModule === 'listening') {
        const arr = Array.isArray(parsed) ? parsed : parsed.questions || [];
        if (arr.length === 0) throw new Error('No Listening tracks found in JSON.');

        const startIdx = FLUENCY_LISTENING_SIMULATOR.length;
        const normalizedTracks = arr.slice(0, 5).map((t, idx) => ({
          id: `ai-lsim-${timestamp}-${idx + 1}`,
          partType: t.partType || 'Part A • Short Dialogue',
          focusCategory: t.focusCategory || 'AI Targeted Listening Drill',
          title: t.title || `AI Listening Drill #${idx + 1}`,
          audioLines: Array.isArray(t.audioLines)
            ? t.audioLines
            : [
                { speaker: 'Speaker', text: t.question || '' },
                { speaker: 'Narrator', text: t.question || '' }
              ],
          question: t.question || 'What does the speaker imply?',
          options: Array.isArray(t.options) ? t.options.slice(0, 4) : ['A', 'B', 'C', 'D'],
          correctIndex: typeof t.correctIndex === 'number' ? t.correctIndex : 0,
          skill: t.skill || 'Listening Comprehension',
          idiomSpotlight: t.idiomSpotlight || 'Key academic expression',
          toneNotes: t.toneNotes || 'Pay attention to speaker stress and intonation.',
          explanation: t.explanation || ''
        }));

        FLUENCY_LISTENING_SIMULATOR.push(...normalizedTracks);
        listeningSimIndex = startIdx;
        appendToAiLocalStorageCache(AI_CACHE_LISTENING_KEY, normalizedTracks);
        renderListeningSimulator();
        showToast(`✨ Added ${normalizedTracks.length} new AI Listening tracks!`);
      }
    } catch (err) {
      showAiErrorBanner(
        alertId,
        `Gemini API Error: ${err.message || 'Failed to generate questions. Check your API key or network connection.'}`,
        true
      );
      showToast('⚠️ Could not generate AI drill — see error banner for details.');
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
      }
    }
  }

  function initAiGeneratorModule() {
    loadCachedAiQuestionsOffline();
    updateAiSettingsUI();

    document.querySelectorAll('[data-open-settings]').forEach((btn) => {
      btn.addEventListener('click', openAiSettingsModal);
    });

    const closeBtn = document.getElementById('btn-close-settings-modal');
    if (closeBtn) closeBtn.addEventListener('click', closeAiSettingsModal);

    const modalBackdrop = document.getElementById('ai-settings-modal');
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeAiSettingsModal();
      });
    }

    document.querySelectorAll('[data-diff-card]').forEach((card) => {
      card.addEventListener('click', () => {
        const val = card.getAttribute('data-diff-card');
        try {
          localStorage.setItem(AI_DIFFICULTY_STORAGE, val);
        } catch (e) {}
        updateAiSettingsUI();
      });
    });

    const saveBtn = document.getElementById('btn-save-ai-settings');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const keyInput = document.getElementById('input-gemini-api-key');
        const selectedRadio = document.querySelector(
          'input[name="ai_difficulty_focus"]:checked'
        );
        const keyVal = keyInput ? keyInput.value.trim() : '';
        const diffVal = selectedRadio
          ? selectedRadio.value
          : 'Mastery 550 to 600+ (Hard Traps)';

        try {
          if (keyVal) {
            localStorage.setItem(GEMINI_KEY_STORAGE, keyVal);
          } else {
            localStorage.removeItem(GEMINI_KEY_STORAGE);
          }
          localStorage.setItem(AI_DIFFICULTY_STORAGE, diffVal);
        } catch (e) {}

        updateAiSettingsUI();
        closeAiSettingsModal();
        showToast(
          keyVal
            ? `✅ Gemini API Key & "${diffVal}" saved to localStorage!`
            : `🎯 Difficulty focus set to "${diffVal}".`
        );
      });
    }

    const clearBtn = document.getElementById('btn-clear-api-key');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        try {
          localStorage.removeItem(GEMINI_KEY_STORAGE);
        } catch (e) {}
        const keyInput = document.getElementById('input-gemini-api-key');
        if (keyInput) keyInput.value = '';
        updateAiSettingsUI();
        showToast('Removed Gemini API Key from localStorage.');
      });
    }

    const genStrBtn = document.getElementById('btn-generate-structure-drill');
    if (genStrBtn) {
      genStrBtn.addEventListener('click', () => generateAiDailyDrill('structure'));
    }

    const genReadBtn = document.getElementById('btn-generate-reading-drill');
    if (genReadBtn) {
      genReadBtn.addEventListener('click', () => generateAiDailyDrill('reading'));
    }
  }

  // =========================================================================
  // 14. PWA SERVICE WORKER REGISTRATION & APP BOOTSTRAP
  // =========================================================================

  function registerServiceWorker() {
    if (
      'serviceWorker' in navigator &&
      (location.protocol === 'https:' ||
        location.hostname === 'localhost' ||
        location.hostname === '127.0.0.1')
    ) {
      navigator.serviceWorker.register('./sw.js').catch(() => {});
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initAiGeneratorModule();
    initNavigation();
    renderScoreTrajectoryHeader();
    initScoreCalculator();
    initHabitTracker();
    initDrillsModule();
    initSimulasiModule();
    initFluencyModule();
    initReviewModule();
    registerServiceWorker();
  });
})();
