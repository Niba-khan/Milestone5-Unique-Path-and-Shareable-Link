import jsPDF from 'jspdf';

window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('resumeForm') as HTMLFormElement;
  const resumeContent = document.getElementById('resumeContent') as HTMLElement;
  const shareLinkButton = document.getElementById('shareLink') as HTMLButtonElement;
  const downloadPDFButton = document.getElementById('downloadPDF') as HTMLButtonElement;

  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const name = (document.getElementById('name') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const number = (document.getElementById('number') as HTMLInputElement).value;
    const education = (document.getElementById('education') as HTMLInputElement).value;
    const school = (document.getElementById('school') as HTMLInputElement).value;
    const experience = (document.getElementById('experience') as HTMLInputElement).value;
    const company = (document.getElementById('company') as HTMLInputElement).value;
    const skills = (document.getElementById('skills') as HTMLInputElement).value;
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const profilePictureInput = document.getElementById('profilePicture') as HTMLInputElement;
    const profilePictureFile = profilePictureInput.files?.[0];
    const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

    if (!name || !email || !number || !education || !school || !experience || !company || !skills || !username) {
      alert("Please fill in all fields.");
      return;
    }

    resumeContent.innerHTML = '';

    if (profilePictureURL) {
      const profilePicture = document.createElement('img');
      profilePicture.src = profilePictureURL;
      profilePicture.alt = 'Profile Picture';
      profilePicture.style.width = '150px';
      profilePicture.style.height = '150px';
      profilePicture.style.borderRadius = '50%';
      resumeContent.appendChild(profilePicture);
    }

    const personalInfo = document.createElement('div');
    personalInfo.className = 'editable'; // Add 'editable' class
    personalInfo.innerHTML = `<h3>Personal Info</h3><p>Name: <span>${name}</span></p><p>Email: <span>${email}</span></p><p>Phone: <span>${number}</span></p>`;
    resumeContent.appendChild(personalInfo);

    const educationSection = document.createElement('div');
    educationSection.className = 'editable'; // Add 'editable' class
    educationSection.innerHTML = `<h4>Education</h4><p>${education} at ${school}</p>`;
    resumeContent.appendChild(educationSection);

    const experienceSection = document.createElement('div');
    experienceSection.className = 'editable'; // Add 'editable' class
    experienceSection.innerHTML = `<h4>Work Experience</h4><p>${experience} at ${company}</p>`;
    resumeContent.appendChild(experienceSection);

    const skillsSection = document.createElement('div');
    skillsSection.className = 'editable'; // Add 'editable' class
    skillsSection.innerHTML = `<h4>Skills</h4><ul></ul>`;
    const skillsList = skills.split(',').map(skill => skill.trim());
    const skillsUl = skillsSection.querySelector('ul') as HTMLElement;

    skillsList.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsUl.appendChild(li);
    });

    resumeContent.appendChild(skillsSection);

    // Add event listeners to all editable sections
    const editableElements = resumeContent.querySelectorAll('.editable');
    editableElements.forEach((element) => {
      element.addEventListener('click', () => makeEditable(element as HTMLElement));
    });
  });

  // Handle share link
  shareLinkButton.addEventListener('click', () => {
    const resumeURL = `https://${(document.getElementById('username') as HTMLInputElement).value}.vercel.app/resume`;
    navigator.clipboard.writeText(resumeURL).then(() => {
      alert('Link copied to clipboard!');
    });
  });

  // Handle PDF download
  downloadPDFButton.addEventListener('click', () => {
    generatePDF();
  });

  function generatePDF() {
    // Load jsPDF using the UMD module syntax
    import('jspdf').then((module) => {
      const { jsPDF } = module;
      const doc = new jsPDF();
      doc.text(resumeContent.textContent || '', 10, 10);
      doc.save('resume.pdf');
    }).catch((error) => {
      console.error('Error loading jsPDF:', error);
    });
  }

  function makeEditable(element: HTMLElement) {
    const originalContent = element.innerHTML;

    const input = document.createElement('input');
    input.type = 'text';
    input.value = originalContent;
    element.innerHTML = '';
    element.appendChild(input);

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => saveChanges(element, input.value));

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => cancelChanges(element, originalContent));

    element.appendChild(saveButton);
    element.appendChild(cancelButton);
  }

  function saveChanges(element: HTMLElement, newValue: string) {
    element.innerHTML = newValue;
  }

  function cancelChanges(element: HTMLElement, originalContent: string) {
    element.innerHTML = originalContent;
  }
});

