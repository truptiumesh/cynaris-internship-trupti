
"use strict";

// Candidate dataset
const candidates = [
    {
        id: 1,
        name: "Trupti Umesh",
        role: "Full Stack Developer",
        skills: ["HTML", "CSS", "JavaScript"],
        status: "Selected"
    },
    {
        id: 2,
        name: "Arun Kumar",
        role: "Frontend Developer",
        skills: ["React", "JavaScript"],
        status: "Interview"
    },
    {
        id: 3,
        name: "Swathi Prasad",
        role: "Backend Developer",
        skills: ["Python", "Node.js"],
        status: "Pending"
    }
];

// Arrow function and object destructuring
const getCandidateName = ({ name }) => name;

// Create candidate card using template literals
const createCandidateCard = ({ name, role, skills, status }) => {
    const initials = name
        .split(" ")
        .map((word) => word[0])
        .join("");

    const statusClass = `status-${status.toLowerCase()}`;

    return `
        <article class="candidate-card">
            <div class="card-top">
                <div class="avatar" aria-hidden="true">${initials}</div>
                <div>
                    <h3>${name}</h3>
                    <p class="role">${role}</p>
                </div>
            </div>
            <p class="skills">Skills: ${skills.join(", ")}</p>
            <span class="status ${statusClass}">${status}</span>
        </article>
    `;
};

// map(): create candidate names
const candidateNames = candidates.map(getCandidateName);
console.log("Candidate names:", candidateNames);

// filter(): find selected candidates
const selectedCandidates = candidates.filter(
    ({ status }) => status === "Selected"
);
console.log("Selected candidates:", selectedCandidates);

// reduce(): count candidates by status
const statusCounts = candidates.reduce((counts, { status }) => {
    counts[status] = (counts[status] || 0) + 1;
    return counts;
}, {});
console.log("Status counts:", statusCounts);

// Array destructuring
const [firstCandidate, secondCandidate] = candidates;
console.log("First candidate:", firstCandidate.name);
console.log("Second candidate:", secondCandidate.name);

// Select HTML elements
const candidateList = document.getElementById("candidateList");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const totalCount = document.getElementById("totalCount");
const selectedCount = document.getElementById("selectedCount");
const interviewCount = document.getElementById("interviewCount");
const emptyMessage = document.getElementById("emptyMessage");

// Render candidate cards
const renderCandidates = (candidateData) => {
    candidateList.innerHTML = candidateData
        .map(createCandidateCard)
        .join("");

    emptyMessage.hidden = candidateData.length > 0;
};

// Filter candidates using search and status
const updateDashboard = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    const filteredCandidates = candidates.filter(
        ({ name, skills, status }) => {
            const matchesSearch =
                name.toLowerCase().includes(searchTerm) ||
                skills.some((skill) =>
                    skill.toLowerCase().includes(searchTerm)
                );

            const matchesStatus =
                selectedStatus === "all" || status === selectedStatus;

            return matchesSearch && matchesStatus;
        }
    );

    renderCandidates(filteredCandidates);
};

// Event listeners
searchInput.addEventListener("input", updateDashboard);
statusFilter.addEventListener("change", updateDashboard);

// Dashboard statistics
const totalByStatus = candidates.reduce((counts, { status }) => {
    counts[status] = (counts[status] || 0) + 1;
    return counts;
}, {});

totalCount.textContent = candidates.length;
selectedCount.textContent = totalByStatus.Selected || 0;
interviewCount.textContent = totalByStatus.Interview || 0;

// Initial display
updateDashboard();
