window.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('resumeForm');
    var resumeContent = document.getElementById('resumeContent');
    var shareLinkButton = document.getElementById('shareLink');
    var downloadPDFButton = document.getElementById('downloadPDF');
    form.addEventListener('submit', function (event) {
        var _a;
        event.preventDefault(); // Prevent form from reloading the page
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var number = document.getElementById('number').value;
        var education = document.getElementById('education').value;
        var school = document.getElementById('school').value;
        var experience = document.getElementById('experience').value;
        var company = document.getElementById('company').value;
        var skills = document.getElementById('skills').value;
        var username = document.getElementById('username').value;
        var profilePictureInput = document.getElementById('profilePicture');
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        if (!name || !email || !number || !education || !school || !experience || !company || !skills || !username) {
            alert("Please fill in all fields.");
            return;
        }
        resumeContent.innerHTML = '';
        if (profilePictureURL) {
            var profilePicture = document.createElement('img');
            profilePicture.src = profilePictureURL;
            profilePicture.alt = 'Profile Picture';
            profilePicture.style.width = '150px';
            profilePicture.style.height = '150px';
            profilePicture.style.borderRadius = '50%';
            resumeContent.appendChild(profilePicture);
        }
        var personalInfo = document.createElement('div');
        personalInfo.className = 'editable'; // Add 'editable' class
        personalInfo.innerHTML = "<h3>Personal Info</h3><p>Name: <span>".concat(name, "</span></p><p>Email: <span>").concat(email, "</span></p><p>Phone: <span>").concat(number, "</span></p>");
        resumeContent.appendChild(personalInfo);
        var educationSection = document.createElement('div');
        educationSection.className = 'editable'; // Add 'editable' class
        educationSection.innerHTML = "<h4>Education</h4><p>".concat(education, " at ").concat(school, "</p>");
        resumeContent.appendChild(educationSection);
        var experienceSection = document.createElement('div');
        experienceSection.className = 'editable'; // Add 'editable' class
        experienceSection.innerHTML = "<h4>Work Experience</h4><p>".concat(experience, " at ").concat(company, "</p>");
        resumeContent.appendChild(experienceSection);
        var skillsSection = document.createElement('div');
        skillsSection.className = 'editable'; // Add 'editable' class
        skillsSection.innerHTML = "<h4>Skills</h4><ul></ul>";
        var skillsList = skills.split(',').map(function (skill) { return skill.trim(); });
        var skillsUl = skillsSection.querySelector('ul');
        skillsList.forEach(function (skill) {
            var li = document.createElement('li');
            li.textContent = skill;
            skillsUl.appendChild(li);
        });
        resumeContent.appendChild(skillsSection);
        // Add event listeners to all editable sections
        var editableElements = resumeContent.querySelectorAll('.editable');
        editableElements.forEach(function (element) {
            element.addEventListener('click', function () { return makeEditable(element); });
        });
    });
    // Handle share link
    shareLinkButton.addEventListener('click', function () {
        var resumeURL = "https://".concat(document.getElementById('username').value, ".vercel.app/resume");
        navigator.clipboard.writeText(resumeURL).then(function () {
            alert('Link copied to clipboard!');
        });
    });
    // Handle PDF download
    downloadPDFButton.addEventListener('click', function () {
        generatePDF();
    });
    function generatePDF() {
        var jsPDF = window.jspdf.jsPDF;
        var doc = new jsPDF();
        doc.text(resumeContent.textContent || '', 10, 10);
        doc.save('resume.pdf');
    }
    function makeEditable(element) {
        var originalContent = element.innerHTML;
        var input = document.createElement('input');
        input.type = 'text';
        input.value = originalContent;
        element.innerHTML = '';
        element.appendChild(input);
        var saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.addEventListener('click', function () { return saveChanges(element, input.value); });
        var cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.addEventListener('click', function () { return cancelChanges(element, originalContent); });
        element.appendChild(saveButton);
        element.appendChild(cancelButton);
    }
    function saveChanges(element, newValue) {
        element.innerHTML = newValue;
    }
    function cancelChanges(element, originalContent) {
        element.innerHTML = originalContent;
    }
});
