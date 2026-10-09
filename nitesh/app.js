/* =========================================================
   FITPRO ULTRA — INTERACTION ENGINE
   - Before/After Slider Controller
   - Dynamic Metabolic Calculator
   - 1-Click WhatsApp Lead Generator
   - Live Coach Customizer Preview Bar
========================================================= */

(function () {
  'use strict';

  // State Management
  const state = {
    coachName: 'Coach Nitesh Soni',
    waNumber: '919876543210',
    weight: 78,
    goal: 'fatloss',
    activity: 'moderate',
    calculatedCalories: 1820,
    calculatedProtein: 125,
    calculatedLoss: '6.5 to 8.0 kg'
  };

  // DOM Elements
  const sliderRange = document.getElementById('sliderRange');
  const afterWrapper = document.getElementById('afterWrapper');
  const sliderDivider = document.getElementById('sliderDivider');

  const currentWeightInput = document.getElementById('currentWeight');
  const targetGoalSelect = document.getElementById('targetGoal');
  const activityLevelSelect = document.getElementById('activityLevel');

  const resCalories = document.getElementById('resCalories');
  const resProtein = document.getElementById('resProtein');
  const resLoss = document.getElementById('resLoss');

  const configCoachName = document.getElementById('configCoachName');
  const configWaNumber = document.getElementById('configWaNumber');
  const applyConfigBtn = document.getElementById('applyConfigBtn');
  const displayBrandName = document.getElementById('displayBrandName');
  const footerBrandName = document.getElementById('footerBrandName');

  const heroWhatsAppBtn = document.getElementById('heroWhatsAppBtn');
  const stickyWhatsAppBtn = document.getElementById('stickyWhatsAppBtn');
  const sendCustomPlanWa = document.getElementById('sendCustomPlanWa');
  const tierButtons = document.querySelectorAll('.btn-tier');

  // --- 1. TRANSFORMATION SLIDER LOGIC ---
  if (sliderRange && afterWrapper && sliderDivider) {
    const updateSlider = (val) => {
      afterWrapper.style.clipPath = `inset(0 0 0 ${val}%)`;
      sliderDivider.style.left = `${val}%`;
    };

    sliderRange.addEventListener('input', (e) => {
      updateSlider(e.target.value);
    });
  }

  // --- 2. METABOLIC ESTIMATOR FORMULA ---
  function recalculateTargets() {
    const weight = parseFloat(currentWeightInput.value) || 75;
    const goal = targetGoalSelect.value;
    const activity = activityLevelSelect.value;

    state.weight = weight;
    state.goal = goal;
    state.activity = activity;

    // Basal multiplier baseline (approx 22 kcal / kg)
    let bmr = weight * 22;
    let multiplier = 1.25; // sedentary
    if (activity === 'moderate') multiplier = 1.45;
    if (activity === 'high') multiplier = 1.65;

    let tdee = bmr * multiplier;
    let targetCalories = Math.round(tdee);
    let targetProtein = Math.round(weight * 1.8);
    let lossEstimate = '5 to 7 kg';

    if (goal === 'fatloss') {
      targetCalories = Math.round(tdee * 0.80); // 20% deficit
      targetProtein = Math.round(weight * 2.0);
      lossEstimate = `${(weight * 0.08).toFixed(1)} to ${(weight * 0.11).toFixed(1)} kg`;
    } else if (goal === 'recomp') {
      targetCalories = Math.round(tdee * 0.90); // 10% deficit
      targetProtein = Math.round(weight * 2.2);
      lossEstimate = `${(weight * 0.04).toFixed(1)} to ${(weight * 0.06).toFixed(1)} kg`;
    } else if (goal === 'muscle') {
      targetCalories = Math.round(tdee * 1.10); // 10% surplus
      targetProtein = Math.round(weight * 1.8);
      lossEstimate = `+${(weight * 0.03).toFixed(1)} to +${(weight * 0.05).toFixed(1)} kg lean gain`;
    }

    state.calculatedCalories = targetCalories;
    state.calculatedProtein = targetProtein;
    state.calculatedLoss = lossEstimate;

    resCalories.textContent = `${targetCalories.toLocaleString()} kcal`;
    resProtein.textContent = `${targetProtein}g / day`;
    resLoss.textContent = lossEstimate;

    updateWhatsAppLinks();
  }

  if (currentWeightInput && targetGoalSelect && activityLevelSelect) {
    currentWeightInput.addEventListener('input', recalculateTargets);
    targetGoalSelect.addEventListener('change', recalculateTargets);
    activityLevelSelect.addEventListener('change', recalculateTargets);
  }

  // --- 3. WHATSAPP LINK ENCODING ---
  function getWhatsAppUrl(customMessage) {
    const cleanNumber = state.waNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(customMessage);
    return `https://wa.me/${cleanNumber}?text=${encoded}`;
  }

  function updateWhatsAppLinks() {
    // Hero Link
    const heroMsg = `Hi ${state.coachName}! 👋 I came across your transformation protocol and would like to apply for the 90-day 1-on-1 coaching program.`;
    if (heroWhatsAppBtn) heroWhatsAppBtn.href = getWhatsAppUrl(heroMsg);
    if (stickyWhatsAppBtn) stickyWhatsAppBtn.href = getWhatsAppUrl(heroMsg);

    // Calculator CTA
    if (sendCustomPlanWa) {
      const calcMsg = `Hi ${state.coachName}! 👋 I just calculated my targets on your tool:\n- Weight: ${state.weight} kg\n- Goal: ${state.goal}\n- Target Calories: ${state.calculatedCalories} kcal\n- Target Protein: ${state.calculatedProtein}g\nEstimated 12-wk change: ${state.calculatedLoss}.\n\nHow do we get started?`;
      sendCustomPlanWa.onclick = () => {
        window.open(getWhatsAppUrl(calcMsg), '_blank');
      };
    }
  }

  // --- 4. TIER BUTTON CLICKS ---
  tierButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tierName = btn.getAttribute('data-tier');
      const planMsg = `Hi ${state.coachName}! 👋 I would like to enroll in the ${tierName}. What are the next steps for payment and onboarding?`;
      window.open(getWhatsAppUrl(planMsg), '_blank');
    });
  });

  // --- 5. DEMO CUSTOMIZER ENGINE ---
  if (applyConfigBtn && configCoachName && configWaNumber) {
    applyConfigBtn.addEventListener('click', () => {
      state.coachName = configCoachName.value.trim() || 'Coach';
      state.waNumber = configWaNumber.value.trim() || '919876543210';

      if (displayBrandName) displayBrandName.textContent = state.coachName;
      if (footerBrandName) footerBrandName.textContent = state.coachName;

      updateWhatsAppLinks();

      applyConfigBtn.textContent = '✓ Updated!';
      setTimeout(() => {
        applyConfigBtn.textContent = 'Update Preview';
      }, 1500);
    });
  }

  // Initial Calculation
  recalculateTargets();
  updateWhatsAppLinks();
})();
