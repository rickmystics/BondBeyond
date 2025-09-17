document.addEventListener('DOMContentLoaded', () => {
    // Dummy Data
    const alumniData = [
        { id: 1, name: "John Doe", photo: "https://via.placeholder.com/150", batch: 2018, department: "CSE", company: "Google", location: "Mountain View, CA", jobTitle: "Software Engineer", email: "john.doe@example.com", linkedin: "linkedin.com/in/johndoe", mentor: true, notable: true, education: [{degree: "B.Tech", uni: "XYZ University", year: 2018}] },
        { id: 2, name: "Jane Smith", photo: "https://via.placeholder.com/150", batch: 2019, department: "ECE", company: "Microsoft", location: "Redmond, WA", jobTitle: "Product Manager", email: "jane.smith@example.com", linkedin: "linkedin.com/in/janesmith", mentor: false, notable: false, education: [{degree: "B.Tech", uni: "XYZ University", year: 2019}] },
        // ... more data
    ];

    const alumniList = document.getElementById('alumni-list');
    const searchInput = document.getElementById('search-input');
    const filterBatch = document.getElementById('filter-batch');
    const filterDept = document.getElementById('filter-dept');
    const filterLocation = document.getElementById('filter-location');
    const profileModal = document.getElementById('profile-modal');
    const profileDetails = document.getElementById('profile-details');
    const closeBtn = document.querySelector('.close-btn');
    const logoutBtn = document.getElementById('logout-btn');

    // Populate filter options
    const batches = [...new Set(alumniData.map(a => a.batch))].sort().reverse();
    batches.forEach(batch => {
        const option = document.createElement('option');
        option.value = batch;
        option.textContent = batch;
        filterBatch.appendChild(option);
    });

    const locations = [...new Set(alumniData.map(a => a.location))].sort();
    locations.forEach(loc => {
        const option = document.createElement('option');
        option.value = loc;
        option.textContent = loc;
        filterLocation.appendChild(option);
    });

    // Render alumni cards
    function renderAlumni(alumni) {
        alumniList.innerHTML = '';
        alumni.forEach(alum => {
            const card = document.createElement('div');
            card.className = 'alumni-card';
            if (alum.notable) card.classList.add('notable');
            card.innerHTML = `
                <img src="${alum.photo}" alt="${alum.name}">
                <div class="name">${alum.name}</div>
                <div class="info">${alum.department}, Batch of ${alum.batch}</div>
                <div class="info">${alum.jobTitle} at ${alum.company}</div>
                <div class="info">${alum.location}</div>
                <button class="connect-btn" data-id="${alum.id}">View Profile</button>
            `;
            alumniList.appendChild(card);
        });
    }

    // Handle filtering and search
    function filterAlumni() {
        const searchTerm = searchInput.value.toLowerCase();
        const batch = filterBatch.value;
        const dept = filterDept.value;
        const location = filterLocation.value;

        const filtered = alumniData.filter(alum => {
            const matchesSearch = alum.name.toLowerCase().includes(searchTerm) ||
                                  alum.company.toLowerCase().includes(searchTerm) ||
                                  alum.location.toLowerCase().includes(searchTerm);
            const matchesBatch = batch === '' || alum.batch.toString() === batch;
            const matchesDept = dept === '' || alum.department === dept;
            const matchesLocation = location === '' || alum.location === location;

            return matchesSearch && matchesBatch && matchesDept && matchesLocation;
        });

        renderAlumni(filtered);
    }

    searchInput.addEventListener('input', filterAlumni);
    filterBatch.addEventListener('change', filterAlumni);
    filterDept.addEventListener('change', filterAlumni);
    filterLocation.addEventListener('change', filterAlumni);

    // Handle detailed profile view
    alumniList.addEventListener('click', (e) => {
        if (e.target.classList.contains('connect-btn')) {
            const alumniId = parseInt(e.target.dataset.id);
            const alum = alumniData.find(a => a.id === alumniId);
            if (alum) {
                profileDetails.innerHTML = `
                    <h2>${alum.name}</h2>
                    <p><strong>Department:</strong> ${alum.department}</p>
                    <p><strong>Batch:</strong> ${alum.batch}</p>
                    <p><strong>Job:</strong> ${alum.jobTitle} at ${alum.company}</p>
                    <p><strong>Location:</strong> ${alum.location}</p>
                    <p><strong>Contact:</strong> <a href="mailto:${alum.email}">${alum.email}</a></p>
                    <p><strong>LinkedIn:</strong> <a href="https://${alum.linkedin}" target="_blank">${alum.linkedin}</a></p>
                    <button class="btn">Request Mentorship</button>
                `;
                profileModal.style.display = 'block';
            }
        }
    });

    closeBtn.onclick = () => profileModal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == profileModal) {
            profileModal.style.display = 'none';
        }
    };

    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        // In a real application, you would perform a backend logout here
        // For this example, we just redirect
        window.location.href = 'alumni-login.html';
    });

    renderAlumni(alumniData);
});