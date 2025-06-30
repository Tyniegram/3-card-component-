document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('mortgage-form');
  const resultsContainer = document.getElementById('results');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate form
    if (validateForm()) {
      calculateMortgage();
    }
  });
  
  function validateForm() {
    let isValid = true;
    const propertyValue = document.getElementById('property-value');
    const deposit = document.getElementById('deposit');
    const interestRate = document.getElementById('interest-rate');
    const loanTerm = document.getElementById('loan-term');
    
    // Reset error messages
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    
    // Validate property value
    if (!propertyValue.value || propertyValue.value <= 0) {
      document.getElementById('property-value-error').textContent = 'Please enter a valid property value';
      isValid = false;
    }
    
    // Validate deposit
    if (!deposit.value || deposit.value <= 0) {
      document.getElementById('deposit-error').textContent = 'Please enter a valid deposit amount';
      isValid = false;
    } else if (Number(deposit.value) >= Number(propertyValue.value)) {
      document.getElementById('deposit-error').textContent = 'Deposit must be less than property value';
      isValid = false;
    }
    
    // Validate interest rate
    if (!interestRate.value || interestRate.value <= 0) {
      document.getElementById('interest-rate-error').textContent = 'Please enter a valid interest rate';
      isValid = false;
    }
    
    // Validate loan term
    if (!loanTerm.value || loanTerm.value <= 0) {
      document.getElementById('loan-term-error').textContent = 'Please enter a valid loan term';
      isValid = false;
    }
    
    return isValid;
  }
  
  function calculateMortgage() {
    const propertyValue = parseFloat(document.getElementById('property-value').value);
    const deposit = parseFloat(document.getElementById('deposit').value);
    const annualInterestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
    const loanTermYears = parseInt(document.getElementById('loan-term').value);
    
    // Calculate loan amount
    const loanAmount = propertyValue - deposit;
    
    // Calculate monthly interest rate
    const monthlyInterestRate = annualInterestRate / 12;
    
    // Calculate number of payments
    const numberOfPayments = loanTermYears * 12;
    
    // Calculate monthly payment using the formula: M = P * (r(1+r)^n) / ((1+r)^n - 1)
    const monthlyPayment = loanAmount * 
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    
    // Calculate total repayment and total interest
    const totalRepayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalRepayment - loanAmount;
    
    // Display results
    document.getElementById('monthly-repayment').textContent = `£${monthlyPayment.toFixed(2)}`;
    document.getElementById('total-repayment').textContent = `£${totalRepayment.toFixed(2)}`;
    document.getElementById('total-interest').textContent = `£${totalInterest.toFixed(2)}`;
    
    // Show results container
    resultsContainer.style.display = 'block';
  }
  
  // Initialize with results hidden
  resultsContainer.style.display = 'none';
  
  // Add keyboard accessibility
  form.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
      e.preventDefault();
      if (validateForm()) {
        calculateMortgage();
      }
    }
  });
});