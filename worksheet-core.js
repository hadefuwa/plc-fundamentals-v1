// Worksheet Core Functionality
const worksheetAnswers = {
  1: {  // Simple PLC Control Systems
    1: { answer: "A", text: "Simple on/off control using push buttons and indicator lights" },
    2: { answer: "C", text: "The red light turns on while the button is pressed, then turns off when released" },
    3: { answer: "D", text: "They show which inputs and outputs are active, based on the PLC logic" },
    4: { answer: "D", text: "In factories to control devices like lights, fans, or alarms" }
  },
  2: {  // Complex PLC Control Systems
    1: { answer: "A", text: "It controls step-by-step processes using inputs, outputs, and logic, like in real factory systems" },
    2: { answer: "B", text: "The outputs turn on one by one in a sequence, even after you release the button" },
    3: { answer: "A", text: "The PLC stores the input signal in memory, so the process keeps running without holding the button" },
    4: { answer: "C", text: "By pressing the red stop button (I2) or the emergency stop" },
    5: { answer: "A", text: "Because most real systems are complex, and you need to know how the program works to fix problems" }
  },
  3: {  // HMIs
    1: { answer: "A", text: "An HMI lets operators view system status and send commands to the PLC" },
    2: { answer: "B", text: "It shows a batch mixing process with ingredient tanks and a final product tank" },
    3: { answer: "C", text: "The three tanks drain into the bottom tank, and controls are locked until mixing finishes" },
    4: { answer: "A", text: "To prevent changes during critical parts of the process, keeping the system safe" },
    5: { answer: "B", text: "They use it to check inputs, outputs, alarms, and test system behaviour" }
  },
  4: {  // Emergency Stops
    1: { answer: "A", text: "To stop the machine immediately in an emergency to keep people safe and protect equipment" },
    2: { answer: "B", text: "An E-Stop is only for emergencies, not for normal stopping or shutdown" },
    3: { answer: "C", text: "The system stops, an alarm appears, and mixing is halted until reset" },
    4: { answer: "A", text: "For safety. If either contact opens, the system stops. This makes the E-Stop more reliable" },
    5: { answer: "B", text: "Twist the E-Stop to release it, then press the blue reset button or use the HMI reset" }
  },
  5: {  // Status LED
    1: { answer: "A", text: "It shows the current state of the system using colours, helping identify faults or normal operation" },
    2: { answer: "B", text: "It often means there is a fault or the emergency stop has been pressed" },
    3: { answer: "C", text: "It usually means the system is healthy and ready or running normally" },
    4: { answer: "A", text: "It may show solid or flashing patterns based on system state, like startup, running, or fault" },
    5: { answer: "B", text: "Because LED behaviour is set in the PLC code and can vary between machines, so reading the manual and understanding the logic is key" }
  },
  6: {  // Normally Open vs Normally Closed
    1: { answer: "A", text: "An NO contact is off until pressed, while an NC contact is on until pressed" },
    2: { answer: "B", text: "Green means the input is currently on; white means it is off" },
    3: { answer: "C", text: "It stays on by default and turns off when the red button is pressed" },
    4: { answer: "A", text: "It latches on when pressed and stays on until pressed again" },
    5: { answer: "B", text: "So you can correctly read input states and avoid misdiagnosing faults" }
  },
  7: {  // Proximity Switch
    1: { answer: "A", text: "It detects the presence of an object without physical contact" },
    2: { answer: "B", text: "They improve safety and reduce wear by detecting position without touching the object" },
    3: { answer: "C", text: "Metal objects only" },
    4: { answer: "A", text: "The system couldn't detect the locking pins because the sensor was not triggered" },
    5: { answer: "B", text: "By placing a metal object in front of the sensor to simulate detection" }
  },
  8: {  // Potentiometer
    1: { answer: "A", text: "It creates a variable voltage signal used to control things like motor speed or level settings" },
    2: { answer: "B", text: "Between 0 and 10 volts" },
    3: { answer: "C", text: "The motor speed increases as the potentiometer is turned to the right" },
    4: { answer: "A", text: "It shifts the signal higher or lower to correct for drift or to fine-tune control" },
    5: { answer: "B", text: "It adjusts the signal to match real-world values, ensuring the system behaves as expected" }
  },
  9: {  // Temperature Sensor
    1: { answer: "A", text: "It tracks heat levels to help prevent overheating, freezing, or system faults" },
    2: { answer: "B", text: "A PT100 RTD sensor" },
    3: { answer: "C", text: "Because the PLC can't read resistance directly—it needs a 0–10V voltage signal" },
    4: { answer: "A", text: "It converts the voltage into a raw value, then multiplies it by a scalar to get temperature in °C" },
    5: { answer: "B", text: "It usually means a fault like a disconnected sensor, wrong input type, or wiring issue" }
  },
  10: {  // Digital Outputs
    1: { answer: "A", text: "To control external devices like lights, motors, relays, and solenoids" },
    2: { answer: "B", text: "LED Q0 turns on only while the button is pressed" },
    3: { answer: "C", text: "LED Q1 stays on after the button is released until turned off by I2" },
    4: { answer: "A", text: "It changes the behaviour of LED Q3. Left keeps it on, right makes it flash" },
    5: { answer: "B", text: "Because real systems often use sequences and recognising them helps with fault finding and confirming correct operation" }
  },
  11: {  // Motor PWM
    1: { answer: "A", text: "PWM stands for Pulse Width Modulation, and it is used to control motor speed" },
    2: { answer: "B", text: "It changes how long the output is on versus off, controlling how much power the motor receives" },
    3: { answer: "C", text: "It sets the PWM level by sending a 0-10V signal to the PLC" },
    4: { answer: "A", text: "100% means the motor is fully on, and 0% means it is off" },
    5: { answer: "B", text: "Because many real systems use PWM to control speed, and being able to read and adjust it helps with troubleshooting and setup" }
  },
  12: {  // Motor Relay
    1: { answer: "A", text: "To safely control higher-power devices like motors or solenoids" },
    2: { answer: "B", text: "By sending power to a coil inside the relay" },
    3: { answer: "C", text: "The relay closes internal contacts to switch the connected output on" },
    4: { answer: "A", text: "Because PLC outputs are low-power and need a relay to handle larger loads" },
    5: { answer: "B", text: "Check for stuck contacts, faulty coils, incorrect logic, or wiring issues" }
  }
};

// Answer tracking functionality
class WorksheetTracker {
  constructor() {
    this.loadProgress();
  }

  // Load saved progress from localStorage
  loadProgress() {
    try {
      this.progress = JSON.parse(localStorage.getItem('worksheetProgress')) || {};
    } catch (error) {
      console.error('Error loading progress:', error);
      this.progress = {};
    }
  }

  // Save progress to localStorage
  saveProgress() {
    try {
      localStorage.setItem('worksheetProgress', JSON.stringify(this.progress));
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  // Save an answer for a specific question
  saveAnswer(worksheetNumber, questionNumber, answer) {
    const worksheetKey = `worksheet_${worksheetNumber}`;
    if (!this.progress[worksheetKey]) {
      this.progress[worksheetKey] = {
        answers: {},
        lastUpdated: new Date().toISOString()
      };
    }

    this.progress[worksheetKey].answers[questionNumber] = {
      answer: answer,
      timestamp: new Date().toISOString()
    };

    this.progress[worksheetKey].lastUpdated = new Date().toISOString();
    this.saveProgress();
  }

  // Get the correct answer for a question
  getCorrectAnswer(worksheetNumber, questionNumber) {
    return worksheetAnswers[worksheetNumber]?.[questionNumber]?.answer;
  }

  // Get the explanation for a question's answer
  getAnswerExplanation(worksheetNumber, questionNumber) {
    return worksheetAnswers[worksheetNumber]?.[questionNumber]?.text;
  }

  // Check if an answer is correct
  isAnswerCorrect(worksheetNumber, questionNumber, answer) {
    const correctAnswer = this.getCorrectAnswer(worksheetNumber, questionNumber);
    return correctAnswer === answer;
  }

  // Get progress for a specific worksheet
  getWorksheetProgress(worksheetNumber) {
    const worksheetKey = `worksheet_${worksheetNumber}`;
    const worksheetData = this.progress[worksheetKey] || { answers: {} };
    const totalQuestions = Object.keys(worksheetAnswers[worksheetNumber] || {}).length;
    const answeredQuestions = Object.keys(worksheetData.answers || {}).length;
    const correctAnswers = Object.entries(worksheetData.answers || {})
      .filter(([qNum, data]) => this.isAnswerCorrect(worksheetNumber, qNum, data.answer))
      .length;

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      completionPercentage: Math.round((correctAnswers / totalQuestions) * 100),
      lastUpdated: worksheetData.lastUpdated
    };
  }

  // Get overall progress across all worksheets
  getOverallProgress() {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    let correctAnswers = 0;
    let lastActivity = null;

    Object.keys(worksheetAnswers).forEach(worksheetNumber => {
      const progress = this.getWorksheetProgress(worksheetNumber);
      totalQuestions += progress.totalQuestions;
      answeredQuestions += progress.answeredQuestions;
      correctAnswers += progress.correctAnswers;

      if (progress.lastUpdated && (!lastActivity || new Date(progress.lastUpdated) > new Date(lastActivity))) {
        lastActivity = progress.lastUpdated;
      }
    });

    return {
      totalQuestions,
      answeredQuestions,
      correctAnswers,
      completionPercentage: Math.round((correctAnswers / totalQuestions) * 100),
      lastActivity
    };
  }

  // Clear all progress
  clearProgress() {
    this.progress = {};
    this.saveProgress();
  }
}

// Initialize the worksheet tracker
const worksheetTracker = new WorksheetTracker();

// Worksheet Core JavaScript Functions
// This file contains the essential functions for loading and rendering worksheets

// URL parameter helper functions
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

function getWorksheetsPageUrl() {
  return 'CP2388-worksheets.html';
}

function goBackToWorksheets() {
  window.location.href = getWorksheetsPageUrl();
}

// Error handling
function showError(message) {
  document.getElementById('loading-container').style.display = 'none';
  document.getElementById('main-content').style.display = 'none';
  document.getElementById('error-container').style.display = 'flex';
  
  const errorContainer = document.getElementById('error-container');
  const errorText = errorContainer.querySelector('p');
  if (errorText) {
    errorText.textContent = message;
  }
}

// Worksheet navigation
function navigateWorksheet(direction) {
  const currentId = parseInt(getUrlParameter('id'));
  const type = getUrlParameter('type') || 'maintenance';
  
  let newId = currentId;
  if (direction === 'next') {
    newId = currentId + 1;
  } else if (direction === 'prev') {
    newId = currentId - 1;
  }
  
  if (newId > 0) {
    window.location.href = `worksheet.html?id=${newId}&type=${type}`;
  }
}

// Update navigation buttons
function updateNavigationButtons() {
  const currentId = parseInt(getUrlParameter('id'));
  const type = getUrlParameter('type') || 'maintenance';
  
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (prevBtn) {
    prevBtn.disabled = currentId <= 1;
  }
  
  // You might want to add logic here to disable next button at the end of worksheets
  // This would require knowing the total number of worksheets for each type
}

// Load specific handler files based on worksheet type
async function loadWorksheetHandlers(type, scenario) {
  const handlersToLoad = [];
  
  if (type === 'maintenance') {
    handlersToLoad.push('worksheet-maintenance-handler.js');
    
    // Load scenario-popup.js if the scenario has a functionCall (interactive worksheet)
    if (scenario && scenario.functionCall) {
      handlersToLoad.push('scenario-popup.js');
    }
  } else if (type === 'fault') {
    handlersToLoad.push('worksheet-fault-handler.js');
    handlersToLoad.push('scenario-popup.js');
  }
  
  // Load handlers dynamically
  for (const handlerSrc of handlersToLoad) {
    if (!document.querySelector(`script[src="${handlerSrc}"]`)) {
      try {
        await loadScript(handlerSrc);
        console.log(`Loaded handler: ${handlerSrc}`);
      } catch (error) {
        console.warn(`Failed to load handler: ${handlerSrc}`, error);
      }
    }
  }
}

// Helper function to load scripts dynamically
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

// Main worksheet loading function
async function loadWorksheet() {
  try {
    console.log('Current URL:', window.location.href);
    console.log('Search params:', window.location.search);
    
    const worksheetId = getUrlParameter('id');
    const type = getUrlParameter('type') || 'maintenance';
    
    console.log('Worksheet ID:', worksheetId);
    console.log('Type:', type);
    
    if (!worksheetId) {
      showError('No worksheet ID specified');
      return;
    }

    // Load data for worksheets first to get scenario info
    const filename = type === 'fault' ? 'dbFaultScenarios.json' : 'dbMaintenanceScenarios.json';
    const response = await fetch(filename);
    const data = await response.json();
    
    const scenario = data.scenarios.find(s => s.id === parseInt(worksheetId));
    if (!scenario) {
      showError('Worksheet not found');
      return;
    }

    console.log('Loading worksheet:', scenario.title);
    console.log('Scenario has functionCall:', scenario.functionCall);

    // Load appropriate handler files (pass scenario for functionCall detection)
    await loadWorksheetHandlers(type, scenario);

    // Render worksheet based on type and functionCall
    if (type === 'maintenance') {
      // Check if this is an interactive worksheet with a functionCall
      if (scenario.functionCall && typeof window[scenario.functionCall] === 'function') {
        console.log(`Calling interactive function: ${scenario.functionCall}`);
        // Instead of calling the popup function, render inline interactive content
        renderInlineInteractiveWorksheet(scenario, parseInt(worksheetId));
      } else {
        // Use the handler system for regular worksheets
        if (typeof renderEnhancedMaintenanceWorksheet === 'function') {
          renderEnhancedMaintenanceWorksheet(scenario, parseInt(worksheetId));
        } else {
          renderMaintenanceWorksheet(scenario);
        }
      }
    } else if (type === 'fault') {
      // Check if fault handler is available
      if (typeof renderFaultScenario === 'function') {
        renderFaultScenario(scenario);
      } else if (scenario.id === 1) {
        renderInteractiveFaultScenario(scenario);
      } else {
        renderBasicFaultScenario(scenario);
      }
    } else {
      renderBasicWorksheet(scenario, type);
    }
    
  } catch (error) {
    console.error('Error loading worksheet:', error);
    showError('Failed to load worksheet');
  } finally {
    // Show content and hide loading
    document.getElementById('loading-container').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
    
    // Update navigation buttons
    setTimeout(updateNavigationButtons, 100);
  }
}

// Enhanced content generator for maintenance worksheets (fallback function)
function generateEnhancedContent(scenario) {
  const worksheetId = scenario.id;
  const title = scenario.title;
  
  // Check if maintenance handler is available and has content
  if (typeof getMaintenanceContent === 'function') {
    return getMaintenanceContent(worksheetId);
  }
  
  // Fallback to basic content template
  return {
    instructions: `Follow the maintenance procedures for ${title.toLowerCase()} as outlined in the system documentation.`,
    steps: [
      { title: "Initial Inspection", description: "Perform a visual inspection of the system components." },
      { title: "Functional Testing", description: "Test the system operation according to procedures." },
      { title: "Documentation", description: "Record all observations and measurements." },
      { title: "Corrective Actions", description: "Implement any necessary corrective actions." }
    ],
    soWhat: {
      intro: `Understanding ${title.toLowerCase()} is important for maintaining reliable industrial systems.`,
      keyPoints: [
        { title: "System Reliability", description: "Proper maintenance ensures reliable operation and prevents unexpected failures." },
        { title: "Safety", description: "Well-maintained systems operate safely and protect personnel and equipment." },
        { title: "Efficiency", description: "Regular maintenance maintains system efficiency and reduces operating costs." },
        { title: "Compliance", description: "Proper maintenance ensures compliance with safety and regulatory requirements." }
      ]
    }
  };
}

// Render maintenance worksheet
function renderMaintenanceWorksheet(scenario) {
  const container = document.getElementById('worksheet-content');
  const worksheetId = scenario.id;
  const enhancedContent = generateEnhancedContent(scenario);
  
  container.innerHTML = `
    <h1 class="page-title">${scenario.title}</h1>

    <div class="worksheet-section introduction-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #2196F3; box-shadow: 0 8px 20px rgba(33, 150, 243, 0.2);">
      <h2 class="section-header" style="color: #2196F3; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-info-circle"></i> 1. Introduction</h2>
              <div class="worksheet-content">
          ${worksheetId === 1 ? `
            <p style="color: #FFFFFF; margin-bottom: 15px;">The system you have in front of you is a Closed-Loop Flow Control system, meaning it continuously adjusts itself to meet a desired target, called the setpoint. It does this by using feedback from sensors to control devices like pumps and valves, keeping the system accurate and stable even if conditions change.</p>
            
            <div class="cad-models" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
              <div class="cad-model" style="text-align: center;">
                <img src="assets/cad.png" alt="CAD Model - Front View" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                <figcaption style="color: #FFFFFF; margin-top: 10px; font-style: italic;">CAD Model - Front View</figcaption>
              </div>
              <div class="cad-model" style="text-align: center;">
                <img src="assets/cad2.png" alt="CAD Model - Side View" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                <figcaption style="color: #FFFFFF; margin-top: 10px; font-style: italic;">CAD Model - Side View</figcaption>
              </div>
            </div>
          ` : `
            ${(scenario.introduction?.paragraphs || scenario.paragraphs || []).map(p => `<p style="color: #FFFFFF; margin-bottom: 15px;">${p}</p>`).join('')}
            
            ${scenario.image ? `
            <div class="system-diagram" style="text-align: center; margin: 20px 0;">
              <figure>
                <img src="assets/maintenance/${scenario.image}" alt="${scenario.title}" style="max-width: 400px; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
                <figcaption style="color: #FFFFFF; margin-top: 10px; font-style: italic;">${scenario.title} System Diagram</figcaption>
              </figure>
            </div>
            ` : ''}
          `}
        </div>
    </div>

    <div class="worksheet-section over-to-you-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #FF9800; box-shadow: 0 8px 20px rgba(255, 152, 0, 0.2);">
      <h2 class="section-header" style="color: #FF9800; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-hands-helping"></i> 2. Over To You</h2>
      <div class="worksheet-content">
        <p style="color: #FFFFFF; margin-bottom: 20px; font-weight: bold;">${enhancedContent.instructions}</p>
        
        <div class="steps-container">
          ${enhancedContent.steps.map((step, index) => `
            <div class="step-card" data-step="${index + 1}" style="background: #333; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #4CAF50; display: flex; align-items: flex-start; gap: 15px; cursor: pointer;">
              <div class="step-number" style="background: #4CAF50; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">${index + 1}</div>
              <div class="step-content" style="flex: 1;">
                <div class="step-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <h4 style="color: #FFFFFF; margin: 0;">${step.title}</h4>
                  <label class="step-checkbox">
                    <input type="checkbox" class="step-complete-checkbox">
                    <span class="checkmark" style="margin-left: 10px;"></span>
                  </label>
                </div>
                <p style="color: #FFFFFF; margin: 0;">${step.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="so-what-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-top: 40px; margin-bottom: 40px; border: 2px solid #9C27B0; box-shadow: 0 8px 20px rgba(156, 39, 176, 0.2);">
      <h2 class="section-header" style="color: #9C27B0; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-lightbulb"></i> 3. So What?</h2>
      <div class="so-what-content">
        <p style="color: #FFFFFF; margin-bottom: 20px;">${enhancedContent.soWhat.intro}</p>
        
        ${enhancedContent.soWhat.keyPoints.map(point => `
          <div class="key-point" style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; padding: 15px; background: #333; border-radius: 8px;">
            <i class="fas fa-lightbulb" style="color: #4CAF50; font-size: 20px; margin-top: 5px;"></i>
            <div>
              <strong style="color: #FFFFFF; display: block; margin-bottom: 5px;">${point.title}</strong>
              <p style="color: #FFFFFF; margin: 0;">${point.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="questions-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #4CAF50; box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);">
      <h2 class="section-header" style="color: #4CAF50; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-question-circle"></i> 4. Questions & Answers</h2>
      <div class="questions-content">
        <div class="instructions" style="background: #333; padding: 15px; border-radius: 8px; margin-bottom: 20px; color: #FFFFFF;">
          <strong>Instructions:</strong> Answer each question based on your observations and understanding of the ${scenario.title.toLowerCase()} system. Your answers will be saved automatically.
        </div>
        
        ${scenario.questions ? scenario.questions.map((q, index) => {
          if (q.type === 'multiple_choice') {
            return `
              <div class="question-item" data-question="${q.id}" style="background: #333; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
                <h4 style="color: #FFFFFF; margin-bottom: 10px;">Question ${index + 1}: ${q.text}</h4>
                <div class="multiple-choice-options" style="margin-bottom: 15px;">
                  ${q.options.map((option, optionIndex) => `
                    <label class="option-label" style="display: block; margin-bottom: 10px; cursor: pointer; padding: 10px; border: 2px solid #555; border-radius: 6px; background: #222; transition: all 0.3s ease;">
                      <input type="radio" name="question-${q.id}" value="${optionIndex}" class="option-radio" style="margin-right: 10px;">
                      <span style="color: #FFFFFF;">${option}</span>
                    </label>
                  `).join('')}
                </div>
                <div class="question-actions" style="margin-top: 15px;">
                  <button class="submit-question-btn" onclick="submitMultipleChoiceQuestion('${q.id}')" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Submit Answer</button>
                  <span class="submit-note" style="color: #AAA; margin-left: 10px;">Select an option and click submit to see the correct answer.</span>
                </div>
                <div class="answer-feedback hidden" style="margin-top: 15px; padding: 15px; border-radius: 4px; display: none;">
                  <div class="feedback-content"></div>
                </div>
              </div>
            `;
          } else {
            return `
              <div class="question-item" data-question="${index + 1}" style="background: #333; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
                <h4 style="color: #FFFFFF; margin-bottom: 10px;">Question ${index + 1}: ${q.text}</h4>
                <textarea class="answer-input" data-question="${index + 1}" placeholder="${q.placeholder || 'Enter your answer here...'}" style="width: 100%; height: 100px; padding: 10px; border: 1px solid #555; border-radius: 4px; background: #222; color: #FFFFFF; resize: vertical;"></textarea>
                <div class="question-actions" style="margin-top: 15px;">
                  <button class="submit-question-btn" onclick="submitAnswer(${index + 1})" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Submit Answer</button>
                  <span class="submit-note" style="color: #AAA; margin-left: 10px;">Your answer will be saved automatically.</span>
                </div>
              </div>
            `;
          }
        }).join('') : '<p style="color: #FFFFFF;">No questions available for this worksheet.</p>'}
      </div>
    </div>
  `;

  // Initialize interactive features
  setTimeout(() => {
    initializeStepTracking();
    loadSavedAnswers();
  }, 100);
}

// Render interactive fault scenario (fallback function)
function renderInteractiveFaultScenario(scenario) {
  // This function may be overridden by the fault handler
  renderBasicFaultScenario(scenario);
}

// Render basic fault scenario (fallback function)
function renderBasicFaultScenario(scenario) {
  const container = document.getElementById('worksheet-content');
  
  container.innerHTML = `
    <h1 class="page-title">Scenario ${scenario.id}: ${scenario.title}</h1>
    ${scenario.subtitle ? `<h2 class="page-subtitle" style="color: #AAA; margin-bottom: 30px; font-size: 18px; text-align: center;">${scenario.subtitle}</h2>` : ''}

    <div class="worksheet-section introduction-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #f44336; box-shadow: 0 8px 20px rgba(244, 67, 54, 0.2);">
      <h2 class="section-header" style="color: #f44336; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-exclamation-triangle"></i> Scenario</h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
        <div class="worksheet-content">
          ${(scenario.introduction?.paragraphs || scenario.paragraphs || []).map(p => `<p style="color: #FFFFFF; margin-bottom: 15px;">${p}</p>`).join('')}
        </div>
        ${scenario.image ? `
        <div style="text-align: center;">
          <img src="assets/scenarios/${scenario.image}" alt="${scenario.title}" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
        </div>
        ` : ''}
      </div>
    </div>

    ${scenario.questions ? `
    <div class="questions-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #4CAF50; box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);">
      <h2 class="section-header" style="color: #4CAF50; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-question-circle"></i> Investigation Questions</h2>
      <div class="questions-content">
        ${scenario.questions.map((q, index) => `
          <div class="question-item" data-question="${index + 1}" style="background: #333; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
            <h4 style="color: #FFFFFF; margin-bottom: 10px;">Question ${index + 1}: ${q.text}</h4>
            <textarea class="answer-input" data-question="${index + 1}" placeholder="${q.placeholder || 'Enter your answer here...'}" style="width: 100%; height: 100px; padding: 10px; border: 1px solid #555; border-radius: 4px; background: #222; color: #FFFFFF; resize: vertical;"></textarea>
            <div class="question-actions" style="margin-top: 15px;">
              <button class="submit-question-btn" onclick="submitAnswer(${index + 1})" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Submit Answer</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;

  setTimeout(() => {
    loadSavedAnswers();
  }, 100);
}

// Render inline interactive worksheet (instead of popup)
function renderInlineInteractiveWorksheet(scenario, worksheetId) {
  const container = document.getElementById('worksheet-content');
  const enhancedContent = generateEnhancedContent(scenario);
  
  container.innerHTML = `
    <h1 class="page-title">${scenario.title}</h1>

    <div class="worksheet-section introduction-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #2196F3; box-shadow: 0 8px 20px rgba(33, 150, 243, 0.2);">
      <h2 class="section-header" style="color: #2196F3; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-info-circle"></i> 1. Introduction</h2>
      <div class="worksheet-content">
        <p style="color: #FFFFFF; margin-bottom: 15px;">The system you have in front of you is a Closed-Loop Flow Control system, meaning it continuously adjusts itself to meet a desired target, called the setpoint. It does this by using feedback from sensors to control devices like pumps and valves, keeping the system accurate and stable even if conditions change.</p>
        
        <div class="cad-models" style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
          <div class="cad-model" style="text-align: center;">
            <img src="assets/cad.png" alt="CAD Model - Front View" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
            <figcaption style="color: #FFFFFF; margin-top: 10px; font-style: italic;">CAD Model - Front View</figcaption>
          </div>
          <div class="cad-model" style="text-align: center;">
            <img src="assets/cad2.png" alt="CAD Model - Side View" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);">
            <figcaption style="color: #FFFFFF; margin-top: 10px; font-style: italic;">CAD Model - Side View</figcaption>
          </div>
        </div>
      </div>
    </div>

    <div class="worksheet-section over-to-you-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #FF9800; box-shadow: 0 8px 20px rgba(255, 152, 0, 0.2);">
      <h2 class="section-header" style="color: #FF9800; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-hands-helping"></i> 2. Over To You</h2>
      <div class="worksheet-content">
        <p style="color: #FFFFFF; margin-bottom: 20px; font-weight: bold;">${enhancedContent.instructions}</p>
        
        <div class="steps-container">
          ${enhancedContent.steps.map((step, index) => `
            <div class="step-card" data-step="${index + 1}" style="background: #333; padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #4CAF50; display: flex; align-items: flex-start; gap: 15px; cursor: pointer;">
              <div class="step-number" style="background: #4CAF50; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">${index + 1}</div>
              <div class="step-content" style="flex: 1;">
                <div class="step-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                  <h4 style="color: #FFFFFF; margin: 0;">${step.title}</h4>
                  <label class="step-checkbox">
                    <input type="checkbox" class="step-complete-checkbox">
                    <span class="checkmark" style="margin-left: 10px;"></span>
                  </label>
                </div>
                <p style="color: #FFFFFF; margin: 0;">${step.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="so-what-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-top: 40px; margin-bottom: 40px; border: 2px solid #9C27B0; box-shadow: 0 8px 20px rgba(156, 39, 176, 0.2);">
      <h2 class="section-header" style="color: #9C27B0; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-lightbulb"></i> 3. So What?</h2>
      <div class="so-what-content">
        <p style="color: #FFFFFF; margin-bottom: 20px;">${enhancedContent.soWhat.intro}</p>
        
        ${enhancedContent.soWhat.keyPoints.map(point => `
          <div class="key-point" style="display: flex; align-items: flex-start; gap: 15px; margin-bottom: 20px; padding: 15px; background: #333; border-radius: 8px;">
            <i class="fas fa-lightbulb" style="color: #4CAF50; font-size: 20px; margin-top: 5px;"></i>
            <div>
              <strong style="color: #FFFFFF; display: block; margin-bottom: 5px;">${point.title}</strong>
              <p style="color: #FFFFFF; margin: 0;">${point.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="questions-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-bottom: 40px; border: 2px solid #4CAF50; box-shadow: 0 8px 20px rgba(76, 175, 80, 0.3);">
      <h2 class="section-header" style="color: #4CAF50; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-question-circle"></i> 4. Questions & Answers</h2>
      <div class="questions-content">
        <div class="instructions" style="background: #333; padding: 15px; border-radius: 8px; margin-bottom: 20px; color: #FFFFFF;">
          <strong>Instructions:</strong> Answer each question based on your observations and understanding of the ${scenario.title.toLowerCase()} system. Your answers will be saved automatically.
        </div>
        
        ${scenario.questions ? scenario.questions.map((q, index) => {
          if (q.type === 'multiple_choice') {
            return `
              <div class="question-item" data-question="${q.id}" style="background: #333; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
                <h4 style="color: #FFFFFF; margin-bottom: 10px;">Question ${index + 1}: ${q.text}</h4>
                <div class="multiple-choice-options" style="margin-bottom: 15px;">
                  ${q.options.map((option, optionIndex) => `
                    <label class="option-label" style="display: block; margin-bottom: 10px; cursor: pointer; padding: 10px; border: 2px solid #555; border-radius: 6px; background: #222; transition: all 0.3s ease;">
                      <input type="radio" name="question-${q.id}" value="${optionIndex}" class="option-radio" style="margin-right: 10px;">
                      <span style="color: #FFFFFF;">${option}</span>
                    </label>
                  `).join('')}
                </div>
                <div class="question-actions" style="margin-top: 15px;">
                  <button class="submit-question-btn" onclick="submitMultipleChoiceQuestion('${q.id}')" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Submit Answer</button>
                  <span class="submit-note" style="color: #AAA; margin-left: 10px;">Select an option and click submit to see the correct answer.</span>
                </div>
                <div class="answer-feedback hidden" style="margin-top: 15px; padding: 15px; border-radius: 4px; display: none;">
                  <div class="feedback-content"></div>
                </div>
              </div>
            `;
          } else {
            return `
              <div class="question-item" data-question="${index + 1}" style="background: #333; padding: 20px; margin-bottom: 20px; border-radius: 8px;">
                <h4 style="color: #FFFFFF; margin-bottom: 10px;">Question ${index + 1}: ${q.text}</h4>
                <textarea class="answer-input" data-question="${index + 1}" placeholder="${q.placeholder || 'Enter your answer here...'}" style="width: 100%; height: 100px; padding: 10px; border: 1px solid #555; border-radius: 4px; background: #222; color: #FFFFFF; resize: vertical;"></textarea>
                <div class="question-actions" style="margin-top: 15px;">
                  <button class="submit-question-btn" onclick="submitAnswer(${index + 1})" style="background: #4CAF50; color: white; border: none; padding: 10px 20px; border-radius: 4px; cursor: pointer;">Submit Answer</button>
                  <span class="submit-note" style="color: #AAA; margin-left: 10px;">Your answer will be saved automatically.</span>
                </div>
              </div>
            `;
          }
        }).join('') : '<p style="color: #FFFFFF;">No questions available for this worksheet.</p>'}
      </div>
    </div>

    <!-- Interactive Simulation Section for Flow Control -->
    <div class="simulation-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-top: 40px; border: 2px solid #FF5722; box-shadow: 0 8px 20px rgba(255, 87, 34, 0.3);">
      <h2 class="section-header" style="color: #FF5722; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-cogs"></i> Interactive System Simulation</h2>
      <div id="system-simulation-container" style="background: #333; padding: 20px; border-radius: 8px; min-height: 400px;">
        <div class="simulation-loading" style="text-align: center; color: #FFFFFF; padding: 50px;">
          <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 15px;"></i>
          <p>Loading flow control simulation...</p>
          <p style="color: #AAA; font-size: 14px;">Simulation will initialize automatically</p>
        </div>
      </div>
    </div>

    <!-- PID Control Learning Section -->
    <div class="simulation-section" style="background: linear-gradient(135deg, #1a1a1a, #2d2d2d); border-radius: 12px; padding: 30px; margin-top: 40px; border: 2px solid #E91E63; box-shadow: 0 8px 20px rgba(233, 30, 99, 0.3);">
      <h2 class="section-header" style="color: #E91E63; margin-bottom: 25px; font-size: 24px; display: flex; align-items: center; gap: 10px;"><i class="fas fa-chart-line"></i> PID Control Learning</h2>
      
      <div class="pid-simulation-tabs" style="margin-bottom: 30px;">
        <div class="tab-buttons" style="display: flex; gap: 10px; margin-bottom: 20px;">
          <button class="tab-btn active" data-tab="tuning" style="background: #E91E63; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">PID Tuning</button>
          <button class="tab-btn" data-tab="response" style="background: #555; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">System Response</button>
          <button class="tab-btn" data-tab="challenges" style="background: #555; color: white; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">Challenges</button>
        </div>
        
        <div class="tab-content" id="tuning-tab" style="display: block;">
          <div id="pid-tuning-container" style="background: #333; padding: 20px; border-radius: 8px; min-height: 400px;">
            <div class="simulation-loading" style="text-align: center; color: #FFFFFF; padding: 50px;">
              <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 15px;"></i>
              <p>Loading PID Tuning Interface...</p>
            </div>
          </div>
        </div>
        
        <div class="tab-content" id="response-tab" style="display: none;">
          <div id="response-analysis-container" style="background: #333; padding: 20px; border-radius: 8px; min-height: 400px;">
            <div class="simulation-loading" style="text-align: center; color: #FFFFFF; padding: 50px;">
              <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 15px;"></i>
              <p>Loading Response Analysis...</p>
            </div>
          </div>
        </div>
        
        <div class="tab-content" id="challenges-tab" style="display: none;">
          <div id="challenges-container" style="background: #333; padding: 20px; border-radius: 8px; min-height: 400px;">
            <div class="simulation-loading" style="text-align: center; color: #FFFFFF; padding: 50px;">
              <i class="fas fa-spinner fa-spin" style="font-size: 24px; margin-bottom: 15px;"></i>
              <p>Loading PID Challenges...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize interactive features
  setTimeout(() => {
    initializeStepTracking();
    loadSavedAnswers();
    initializeInteractiveSimulation();
    initializePIDTabs();
  }, 100);
}

// Initialize interactive simulation for worksheet 1
function initializeInteractiveSimulation() {
  // Try to initialize the main flow control simulation
  if (typeof initializePumpSimulation === 'function') {
    console.log('Initializing pump simulation for interactive worksheet');
    initializePumpSimulation();
  }
  
  if (typeof initializeValveSimulation === 'function') {
    console.log('Initializing valve simulation for interactive worksheet');
    initializeValveSimulation();
  }
}

// Initialize PID simulation tabs (copied from maintenance handler)
function initializePIDTabs() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetTab = this.getAttribute('data-tab');
      
      // Update button states
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.background = '#555';
      });
      this.classList.add('active');
      this.style.background = '#E91E63';
      
      // Update tab content visibility
      tabContents.forEach(content => {
        content.style.display = 'none';
      });
      const targetTabContent = document.getElementById(`${targetTab}-tab`);
      if (targetTabContent) {
        targetTabContent.style.display = 'block';
      }
    });
  });
}

// Render basic worksheet (fallback)
function renderBasicWorksheet(scenario, type) {
  const container = document.getElementById('worksheet-content');
  
  container.innerHTML = `
    <h1 class="page-title">${scenario.title}</h1>
    
    <div class="worksheet-section" style="margin-bottom: 30px;">
      <h2 class="section-header">Overview</h2>
      <div class="worksheet-content">
        ${(scenario.introduction?.paragraphs || scenario.paragraphs || []).map(p => `<p>${p}</p>`).join('')}
        ${scenario.image ? `<img src="assets/${type === 'fault' ? 'scenarios' : 'maintenance'}/${scenario.image}" alt="${scenario.title}" class="scenario-image">` : ''}
      </div>
    </div>
    
    ${scenario.questions ? `
    <div class="worksheet-section">
      <h2 class="section-header">Questions</h2>
      <div class="questions-content">
        ${scenario.questions.map((q, index) => `
          <div class="question-item" data-question="${index + 1}">
            <h4>Question ${index + 1}: ${q.text}</h4>
            <textarea class="answer-input" data-question="${index + 1}" placeholder="${q.placeholder || 'Enter your answer here...'}"></textarea>
            <button class="submit-question-btn" onclick="submitAnswer(${index + 1})">Submit Answer</button>
          </div>
        `).join('')}
      </div>
    </div>
    ` : ''}
  `;

  setTimeout(() => {
    loadSavedAnswers();
  }, 100);
}

// Step tracking functionality
function initializeStepTracking() {
  const stepCards = document.querySelectorAll('.step-card');
  stepCards.forEach(stepCard => {
    const checkbox = stepCard.querySelector('.step-complete-checkbox');
    if (checkbox) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          stepCard.classList.add('step-completed');
        } else {
          stepCard.classList.remove('step-completed');
        }
        saveStepProgress();
      });
    }
  });
  
  loadStepProgress();
}

function saveStepProgress() {
  const worksheetId = getUrlParameter('id');
  const type = getUrlParameter('type') || 'maintenance';
  const key = `worksheet-${type}-${worksheetId}-steps`;
  
  const completedSteps = [];
  document.querySelectorAll('.step-complete-checkbox:checked').forEach(checkbox => {
    const stepCard = checkbox.closest('.step-card');
    const stepNumber = stepCard.getAttribute('data-step');
    completedSteps.push(stepNumber);
  });
  
  localStorage.setItem(key, JSON.stringify(completedSteps));
}

function loadStepProgress() {
  const worksheetId = getUrlParameter('id');
  const type = getUrlParameter('type') || 'maintenance';
  const key = `worksheet-${type}-${worksheetId}-steps`;
  
  const savedSteps = JSON.parse(localStorage.getItem(key) || '[]');
  
  savedSteps.forEach(stepNumber => {
    const stepCard = document.querySelector(`[data-step="${stepNumber}"]`);
    if (stepCard) {
      const checkbox = stepCard.querySelector('.step-complete-checkbox');
      if (checkbox) {
        checkbox.checked = true;
        stepCard.classList.add('step-completed');
      }
    }
  });
}

// Answer handling functions
function submitAnswer(questionNumber) {
  const answerInput = document.querySelector(`[data-question="${questionNumber}"]`);
  if (!answerInput) return;
  
  const selectedOption = document.querySelector(`input[name="question-${questionNumber}"]:checked`);
  if (!selectedOption) {
    alert('Please select an answer before submitting.');
    return;
  }
  
  const answer = selectedOption.value;
  
  // Save with enhanced tracking if available
  if (typeof worksheetTracker !== 'undefined') {
    const worksheetId = getUrlParameter('id') || getWorksheetIdFromUrl();
    const type = getUrlParameter('type') || 'maintenance';
    worksheetTracker.saveAnswer(worksheetId, questionNumber, answer, type);
  } else {
    // Fallback to original save method
    saveAnswer(questionNumber, answer);
  }
  
  const submitBtn = answerInput.querySelector('.submit-question-btn');
  if (submitBtn) {
    submitBtn.textContent = 'Answer Saved!';
    submitBtn.style.background = '#4CAF50';
    setTimeout(() => {
      submitBtn.textContent = 'Submit Answer';
      submitBtn.style.background = '#4CAF50';
    }, 2000);
  }
  
  // Show correct answer if available
  const correctAnswer = answerInput.querySelector('.correct-answer');
  if (correctAnswer) {
    correctAnswer.style.display = 'block';
  }
}

// Helper function to get worksheet ID from URL
function getWorksheetIdFromUrl() {
  const path = window.location.pathname;
  const match = path.match(/worksheet-(\d+)\.html/);
  return match ? parseInt(match[1]) : 1;
}

function submitMultipleChoiceQuestion(questionId) {
  const selectedOption = document.querySelector(`input[name="question-${questionId}"]:checked`);
  if (!selectedOption) {
    alert('Please select an answer before submitting.');
    return;
  }
  
  const answerValue = selectedOption.value;
  saveAnswer(questionId, answerValue);
  
  // Show feedback (this would be enhanced with actual feedback logic)
  const feedbackDiv = document.querySelector(`[data-question="${questionId}"] .answer-feedback`);
  if (feedbackDiv) {
    feedbackDiv.style.display = 'block';
    feedbackDiv.querySelector('.feedback-content').innerHTML = '<p style="color: #4CAF50;">Answer submitted successfully!</p>';
  }
}

function saveAnswer(questionNumber, answer) {
  const worksheetId = getUrlParameter('id') || getWorksheetIdFromUrl();
  const type = getUrlParameter('type') || 'maintenance';
  const key = `worksheet-${type}-${worksheetId}-answers`;
  
  const savedAnswers = JSON.parse(localStorage.getItem(key) || '{}');
  savedAnswers[questionNumber] = answer;
  
  localStorage.setItem(key, JSON.stringify(savedAnswers));
}

function loadSavedAnswers() {
  const worksheetId = getUrlParameter('id') || getWorksheetIdFromUrl();
  const type = getUrlParameter('type') || 'maintenance';
  const key = `worksheet-${type}-${worksheetId}-answers`;
  
  const savedAnswers = JSON.parse(localStorage.getItem(key) || '{}');
  
  Object.keys(savedAnswers).forEach(questionNumber => {
    const answerInput = document.querySelector(`[data-question="${questionNumber}"]`);
    if (answerInput && answerInput.tagName === 'TEXTAREA') {
      answerInput.value = savedAnswers[questionNumber];
    } else if (answerInput && answerInput.type === 'radio') {
      const radioInput = document.querySelector(`input[name="question-${questionNumber}"][value="${savedAnswers[questionNumber]}"]`);
      if (radioInput) {
        radioInput.checked = true;
      }
    }
  });
} 