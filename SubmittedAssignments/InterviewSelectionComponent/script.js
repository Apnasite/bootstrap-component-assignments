class InterviewSelectionComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
    <div class="container mt-4">
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="industrySelect">Industry</label>
                    <select class="form-control" id="industrySelect">
                        <option value="">Select Industry</option>
                        <option value="It-Industry">It Industry</option>
                    </select>
                    <div id="industryError" class="text-danger"></div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="roleSelect">Role</label>
                    <select class="form-control" id="roleSelect">
                        <option value="">Select Role</option>
                    </select>
                    <div id="roleError" class="text-danger"></div>
                </div>
            </div>
        </div>
        <div class="form-group" id="skillsContainer">
            <label>Skills</label><br>
            <div id="skillsError" class="text-danger"></div>
            <div class="d-flex flex-wrap" id="skillsList">
            </div>
        </div>
        <button id="submitBtn" class="btn btn-primary">Start Interview</button>
    </div>
    <div id="popup" style="display: none; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 20px; border: 1px solid #ccc; z-index: 1000;">
        <p>Please select at least one skill.</p>
        <button id="closePopup" class="btn btn-secondary">Close</button>
    </div>
`;

    this.industrySelect = this.shadowRoot.getElementById('industrySelect');
    this.roleSelect = this.shadowRoot.getElementById('roleSelect');
    this.skillsContainer = this.shadowRoot.getElementById('skillsContainer');
    this.submitBtn = this.shadowRoot.getElementById('submitBtn');
    this.industryError = this.shadowRoot.getElementById('industryError');
    this.roleError = this.shadowRoot.getElementById('roleError');
    this.skillsError = this.shadowRoot.getElementById('skillsError');
    this.popup = this.shadowRoot.getElementById('popup');
    this.closePopup = this.shadowRoot.getElementById('closePopup');

    this.industrySelect.addEventListener('change', () => this.populateRoles());
    this.roleSelect.addEventListener('change', () => this.populateSkills());
    this.submitBtn.addEventListener('click', () => this.submitSelection());
    this.closePopup.addEventListener('click', () => this.popup.style.display = 'none');
  }

  connectedCallback() {
    this.updateData();
  }

  static get observedAttributes() {
    return ['data'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'data') {
      this.updateData();
    }
  }

  updateData() {
    const rawData = this.getAttribute('data');
    try {
      this.data = JSON.parse(rawData);
      console.log('Received data:', this.data);
    } catch (error) {
      console.error('Invalid JSON data:', rawData);
    }
  }

  populateRoles() {
    const selectedIndustry = this.industrySelect.value;
    this.roleSelect.innerHTML = '<option value="">Select Role</option>';
    this.skillsContainer.innerHTML = '<label>Skills</label><br>';

    if (selectedIndustry === 'It-Industry') {
      this.addRoleOptions([
        'Full Stack Developer',
        'Software Tester',
        'DevOps Engineer',
        'Software Engineer',
        'Data Scientist',
        'Project Manager',
        'MEAN Stack Developer',
        'MERN Stack Developer',
        'Frontend Developer',
        'Backend Developer',
        'Mobile App Developer'
      ]);
    }
     else if (selectedIndustry === 'finance') {
      this.addRoleOptions(['Financial Analyst', 'Accountant', 'Investment Banker']);
    } else if (selectedIndustry === 'healthcare') {
      this.addRoleOptions(['Doctor', 'Nurse', 'Medical Technician']);
    } else if (selectedIndustry === 'education') {
        this.addRoleOptions(['Teacher', 'Professor', 'Administrator']);
    }
  }

  addRoleOptions(roles) {
    roles.forEach(role => {
      const option = document.createElement('option');
      option.value = role.toLowerCase().replace(/\s+/g, '-');
      option.textContent = role;
      this.roleSelect.appendChild(option);
    });
  }

  populateSkills() {
    const selectedRole = this.roleSelect.value;
    this.skillsContainer.innerHTML = '<label>Skills</label><br>';

    if (selectedRole === 'software-engineer') {
      this.addSkillCheckboxes(['JavaScript', 'Python', 'Java', 'React', 'Node.js', 'C++']);
    } else if (selectedRole === 'data-scientist') {
      this.addSkillCheckboxes(['Python', 'R', 'Machine Learning', 'Data Analysis', 'SQL', 'TensorFlow', 'PyTorch']);
    } else if (selectedRole === 'financial-analyst') {
      this.addSkillCheckboxes(['Financial Modeling', 'Data Analysis', 'Accounting', 'Excel', 'Bloomberg Terminal', 'Financial Reporting']);
    } else if (selectedRole === 'teacher') {
      this.addSkillCheckboxes(['Communication', 'Lesson Planning', 'Classroom Management', 'Subject Matter Expertise', 'Pedagogy']);
    } else if (selectedRole === 'software-tester') {
      this.addSkillCheckboxes(['Test Planning', 'Test Execution', 'Bug Tracking', 'Automation Testing', 'Selenium', 'Jira']);
    } else if (selectedRole === 'devops-engineer') {
      this.addSkillCheckboxes(['CI/CD', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Linux', 'Terraform']);
    } else if (selectedRole === 'full-stack-developer') {
      this.addSkillCheckboxes(['JavaScript', 'React', 'Node.js', 'HTML', 'CSS', 'Databases', 'API Design']);
    } else if (selectedRole === 'mean-stack-developer') {
      this.addSkillCheckboxes(['MongoDB', 'Express.js', 'Angular', 'Node.js', 'JavaScript', 'TypeScript']);
    } else if (selectedRole === 'mern-stack-developer') {
      this.addSkillCheckboxes(['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript']);
    } else if (selectedRole === 'frontend-developer') {
      this.addSkillCheckboxes(['HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Vue.js', 'UI/UX']);
    } else if (selectedRole === 'backend-developer') {
      this.addSkillCheckboxes(['Node.js', 'Python', 'Java', 'Databases', 'API Development', 'Server Management']);
    } else if (selectedRole === 'mobile-app-developer') {
        this.addSkillCheckboxes(['Android Development', 'iOS Development', 'React Native', 'Flutter', 'Java', 'Swift', 'Kotlin']);
    }
  }

  addSkillCheckboxes(skills) {
    skills.forEach(skill => {
      const skillId = skill.toLowerCase().replace(/\s+/g, '-');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = skillId;
      checkbox.value = skillId;
      checkbox.classList.add('mr-1');
      const label = document.createElement('label');
      label.htmlFor = skillId;
      label.textContent = skill;
      label.classList.add('mr-2');
      this.skillsContainer.appendChild(checkbox);
      this.skillsContainer.appendChild(label);
    });
  }

  submitSelection() {
    this.industryError.textContent = '';
    this.roleError.textContent = '';
    this.skillsError.textContent = '';

    const selectedIndustry = this.industrySelect.value;
    const selectedRole = this.roleSelect.value;
    const selectedSkills = Array.from(this.skillsContainer.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.value);

    let isValid = true;

    if (!selectedIndustry) {
      this.industryError.textContent = 'Industry is required.';
      isValid = false;
      return;
    }
    if (!selectedRole) {
      this.roleError.textContent = 'Role is required.';
      isValid = false;
      return;
    }
    if (selectedSkills.length === 0) {
      this.popup.style.display = 'block';
      isValid = false;
      return;
    }

    if (!isValid) {
      return;
    }

    const selectionData = {
      industry: selectedIndustry,
      role: selectedRole,
      skills: selectedSkills.join(' '),
    };

    console.log('Selected data:', selectionData);
    const customEvent = new CustomEvent('redirect', {
      bubbles: true,
      cancelable: true,
      detail: {
        data: {
          isExternalRedirect: false,
          redirectUrl: `/test/67b2e622159389010cc5534f/Interview`,
          queryParams: JSON.stringify(selectionData)
        }
      }
    });

    this.dispatchEvent(customEvent);
  }
}

customElements.define('interview-selection-component', InterviewSelectionComponent);