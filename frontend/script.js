document.addEventListener('DOMContentLoaded', () => {
    const alumniList = document.getElementById('alumni-list');
    const searchInput = document.getElementById('search-input');
    const filterBatch = document.getElementById('filter-batch');
    const filterDept = document.getElementById('filter-dept');
    const filterLocation = document.getElementById('filter-location');
    const logoutBtn = document.getElementById('logout-btn');

    // Function to fetch alumni data from the backend
    async function fetchAlumni() {
        // Construct the URL with query parameters for search and filters
        const url = new URL('http://localhost:3000/api/alumni');
        const params = new URLSearchParams();
        if (searchInput.value) params.append('search', searchInput.value);
        if (filterBatch.value) params.append('batch', filterBatch.value);
        if (filterDept.value) params.append('department', filterDept.value);
        if (filterLocation.value) params.append('location', filterLocation.value);
        url.search = params.toString();

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch alumni data.');
            }
            const alumniData = await response.json();
            renderAlumni(alumniData);
        } catch (error) {
            console.error(error);
            alumniList.innerHTML = `<p style="text-align:center; color: #888;">Error loading alumni data.</p>`;
        }
    }

    // Function to render the alumni cards on the page
    function renderAlumni(alumni) {
        alumniList.innerHTML = ''; // Clear previous cards
        if (alumni.length === 0) {
            alumniList.innerHTML = `<p style="text-align:center; color: #888;">No alumni found matching your criteria.</p>`;
            return;
        }

        alumni.forEach(alum => {
            const card = document.createElement('div');
            card.className = 'alumni-card';
            card.innerHTML = `
                <img src="${alum.photo_url || 'https://via.placeholder.com/150'}" alt="${alum.full_name}">
                <div class="name">${alum.full_name}</div>
                <div class="info">${alum.department}, Batch of ${alum.batch_year}</div>
                <div class="info">${alum.current_job_title} at ${alum.current_company}</div>
                <div class="info">${alum.location}</div>
                <button class="connect-btn" data-id="${alum.id}">View Profile</button>
            `;
            alumniList.appendChild(card);
        });
    }

    // Event listeners for search and filters
    searchInput.addEventListener('input', fetchAlumni);
    filterBatch.addEventListener('change', fetchAlumni);
    filterDept.addEventListener('change', fetchAlumni);
    filterLocation.addEventListener('change', fetchAlumni);
    
    // Logout functionality
    logoutBtn.addEventListener('click', () => {
        // In a real application, you would clear any session data here
        window.location.href = 'alumni-login.html';
    });

    // Initial fetch when the page loads
    fetchAlumni();
});