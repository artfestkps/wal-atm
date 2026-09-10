/**
 * Ummath APP - Waltakun'26 Single Page Application Engine
 */

class AppController {
  constructor() {
    this.currentTab = "dashboard";
    this.init();
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.bindEvents();
      this.render();
    });
  }

  bindEvents() {
    // Navigation link handlers
    document.querySelectorAll("[data-tab]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = el.getAttribute("data-tab");
        this.switchTab(tab);
      });
    });

    // Login Form Submit
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("login-username").value;
        const pass = document.getElementById("login-password").value;
        const res = window.authManager.login(id, pass);
        if (res.success) {
          this.switchTab(res.role === "team_leader" ? "team_leader" : "dashboard");
          this.showToast(`Welcome back, ${res.user.name}!`, "success");
        } else {
          this.showToast(res.message, "error");
        }
      });
    }

    // Logout Button
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        window.authManager.logout();
        this.switchTab("login");
        this.showToast("Logged out successfully.", "info");
      });
    }

    // Change Password Modal Trigger & Form Submit
    const changePassBtn = document.getElementById("change-pass-btn");
    if (changePassBtn) {
      changePassBtn.addEventListener("click", () => {
        this.openModal("change-password-modal");
      });
    }

    const changePassForm = document.getElementById("change-pass-form");
    if (changePassForm) {
      changePassForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newPass = document.getElementById("new-password").value;
        const confirmPass = document.getElementById("confirm-password").value;
        if (newPass !== confirmPass) {
          this.showToast("New passwords do not match!", "error");
          return;
        }
        const currentUser = window.authManager.getCurrentUser();
        if (currentUser && currentUser.chestNo) {
          window.dataEngine.updateStudentPassword(currentUser.chestNo, newPass);
          this.closeModal("change-password-modal");
          this.showToast("Password updated successfully!", "success");
        }
      });
    }

    // Team Leader Scoped Student Search Form
    const teamSearchForm = document.getElementById("team-search-form");
    if (teamSearchForm) {
      teamSearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const targetChest = document.getElementById("team-search-chest").value.trim();
        this.handleTeamLeaderSearch(targetChest);
      });
    }

    // Sheets Config Modal Form
    const sheetsConfigForm = document.getElementById("sheets-config-form");
    if (sheetsConfigForm) {
      sheetsConfigForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const url = document.getElementById("sheets-url-input").value.trim();
        localStorage.setItem("ummath_sheets_api_url", url);
        this.closeModal("sheets-config-modal");
        this.showToast("Google Sheets API URL saved!", "success");
      });
    }
  }

  switchTab(tabName) {
    if (!window.authManager.isLoggedIn() && tabName !== "login") {
      tabName = "login";
    }

    this.currentTab = tabName;
    
    // Hide all view containers
    document.querySelectorAll(".view-container").forEach(c => c.classList.add("hidden"));
    
    // Show target container
    const target = document.getElementById(`view-${tabName}`);
    if (target) target.classList.remove("hidden");

    // Update active state on nav items
    document.querySelectorAll("[data-tab]").forEach(el => {
      if (el.getAttribute("data-tab") === tabName) {
        el.classList.add("active", "text-yellow-300");
      } else {
        el.classList.remove("active", "text-yellow-300");
      }
    });

    this.render();
  }

  render() {
    const user = window.authManager.getCurrentUser();
    
    // Header user info display
    const userDisplay = document.getElementById("header-user-info");
    const logoutBtn = document.getElementById("logout-btn");
    const leaderNavTab = document.getElementById("nav-tab-team-leader");

    // Hide all navigation tabs by default
    document.querySelectorAll("[data-tab]").forEach(el => el.classList.add("hidden"));

    if (user) {
      if (userDisplay) {
        userDisplay.innerHTML = `
          <div class="flex items-center space-x-2">
            <span class="text-xs font-semibold px-2 py-0.5 rounded-full badge-${user.team ? user.team.toLowerCase() : 'qiyadah'}">${user.team || 'ADMIN'}</span>
            <span class="text-sm font-bold text-yellow-200">${user.name}</span>
          </div>
        `;
      }
      // Show navigation tabs after login
      document.querySelectorAll("[data-tab]").forEach(el => el.classList.remove("hidden"));
      if (logoutBtn) logoutBtn.classList.remove("hidden");
      if (leaderNavTab) {
        if (window.authManager.isTeamLeader()) leaderNavTab.classList.remove("hidden");
        else leaderNavTab.classList.add("hidden");
      }
    } else {
      if (userDisplay) userDisplay.innerHTML = "";
      if (logoutBtn) logoutBtn.classList.add("hidden");
      if (leaderNavTab) leaderNavTab.classList.add("hidden");
    }

    // Render specific view logic
    switch (this.currentTab) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "arts":
        this.renderArtsView();
        break;
      case "sports":
        this.renderSportsView();
        break;
      case "schedule":
        this.renderScheduleView();
        break;
      case "team_leader":
        this.renderTeamLeaderView();
        break;
      case "leaderboard":
        this.renderLeaderboardView();
        break;
    }
  }

  renderDashboard() {
    const user = window.authManager.getCurrentUser();
    if (!user || user.role !== "student") return;

    const student = window.dataEngine.getStudentByChest(user.chestNo);
    if (!student) return;

    // Student Info & Photo
    document.getElementById("dash-student-name").textContent = student.name;
    document.getElementById("dash-student-chest").textContent = `Chest No: ${student.chestNo}`;
    document.getElementById("dash-student-class").textContent = student.class;
    document.getElementById("dash-student-cat").textContent = student.category;
    
    const teamBadge = document.getElementById("dash-student-team");
    teamBadge.textContent = student.team;
    teamBadge.className = `px-3 py-1 text-sm font-bold rounded-full badge-${student.team.toLowerCase()}`;

    // Avatar image handling (Google Drive ID or fallback SVG)
    const avatarImg = document.getElementById("dash-avatar-img");
    const driveUrl = window.dataEngine.getGoogleDriveImageUrl(student.driveId);
    if (driveUrl) {
      avatarImg.src = driveUrl;
      avatarImg.onerror = () => {
        avatarImg.src = "assets/logo-gold.jpg";
      };
    } else {
      avatarImg.src = "assets/logo-gold.jpg";
    }

    // Calculate Points
    const points = window.dataEngine.calculateStudentPoints(student.chestNo);
    document.getElementById("dash-total-points").textContent = points;

    // Programs Registered Summary
    const artsPrograms = window.dataEngine.getProgramsForStudent(student.chestNo);
    const sportsPrograms = window.dataEngine.getSportsForStudent(student.chestNo);
    document.getElementById("dash-arts-count").textContent = artsPrograms.length;
    document.getElementById("dash-sports-count").textContent = sportsPrograms.length;

    // Quick Schedule Timeline
    const scheduleItems = window.dataEngine.getScheduleForStudent(student.chestNo);
    const timelineContainer = document.getElementById("dash-schedule-timeline");
    if (timelineContainer) {
      if (scheduleItems.length === 0) {
        timelineContainer.innerHTML = `<p class="text-gray-400 text-sm italic">No upcoming schedule cross-referenced yet.</p>`;
      } else {
        timelineContainer.innerHTML = scheduleItems.slice(0, 4).map(item => `
          <div class="flex items-start space-x-3 p-3 bg-gray-800/60 rounded-lg border-l-4 border-yellow-300">
            <div class="text-xs font-bold text-yellow-300 min-w-[70px]">
              <div>${item.date}</div>
              <div class="text-gray-400">${item.time}</div>
            </div>
            <div>
              <div class="font-bold text-sm text-white">${item.program} <span class="text-xs text-yellow-200">(${item.code})</span></div>
              <div class="text-xs text-gray-300">Venue: ${item.venue} | Duration: ${item.duration}</div>
            </div>
          </div>
        `).join("");
      }
    }
  }

  renderArtsView() {
    const user = window.authManager.getCurrentUser();
    if (!user || user.role !== "student") return;

    const artsPrograms = window.dataEngine.getProgramsForStudent(user.chestNo);
    const container = document.getElementById("arts-program-list");
    if (!container) return;

    if (artsPrograms.length === 0) {
      container.innerHTML = `<div class="col-span-full p-6 text-center text-gray-400 italic fest-card">No Arts Programs registered for Chest #${user.chestNo}.</div>`;
      return;
    }

    container.innerHTML = artsPrograms.map(p => `
      <div class="fest-card p-5 border-l-4 border-red-600">
        <div class="flex justify-between items-start mb-2">
          <span class="text-xs font-bold px-2 py-1 bg-yellow-300/20 text-yellow-300 rounded border border-yellow-300/40">${p.code}</span>
          <span class="text-xs font-semibold px-2 py-0.5 bg-gray-700 text-gray-200 rounded-full">${p.type}</span>
        </div>
        <h3 class="text-lg font-bold text-white mb-1">${p.program}</h3>
        <div class="text-xs text-gray-300">Section: <span class="font-semibold text-yellow-200">${p.section}</span></div>
      </div>
    `).join("");
  }

  renderSportsView() {
    const user = window.authManager.getCurrentUser();
    if (!user || user.role !== "student") return;

    const sportsPrograms = window.dataEngine.getSportsForStudent(user.chestNo);
    const container = document.getElementById("sports-program-list");
    if (!container) return;

    if (sportsPrograms.length === 0) {
      container.innerHTML = `<div class="col-span-full p-6 text-center text-gray-400 italic fest-card">No Sports Events registered for Chest #${user.chestNo}.</div>`;
    } else {
      container.innerHTML = sportsPrograms.map(s => `
        <div class="fest-card p-5 border-l-4 border-yellow-400">
          <div class="flex justify-between items-start mb-2">
            <span class="text-xs font-bold px-2 py-1 bg-green-500/20 text-green-300 rounded border border-green-500/40">${s.category}</span>
            <span class="text-xs font-semibold px-2 py-0.5 bg-gray-700 text-gray-200 rounded-full">${s.team}</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-1">${s.programName}</h3>
          <div class="text-xs text-gray-300">Candidate: <span class="font-semibold text-yellow-200">${s.studentName}</span></div>
        </div>
      `).join("");
    }

    // Render Sports Results – clean achievement cards
    const studentChest = user.chestNo;
    const sportsResults = window.dataEngine.getSportsResultsForStudent(studentChest);
    const resContainer = document.getElementById("sports-published-results");
    if (resContainer) {
      if (sportsResults.length === 0) {
        resContainer.innerHTML = `<p class="text-gray-400 text-sm italic text-center col-span-full">No sports results yet.</p>`;
      } else {
        resContainer.innerHTML = sportsResults.map(r => {
          // pick medal emoji & accent colour based on position
          let medal = '🥇', accentBorder = 'border-yellow-400', accentBg = 'bg-yellow-500/20', accentText = 'text-yellow-300';
          if (r.studentPosition.startsWith('2')) { medal = '🥈'; accentBorder = 'border-gray-400'; accentBg = 'bg-gray-500/20'; accentText = 'text-gray-200'; }
          if (r.studentPosition.startsWith('3')) { medal = '🥉'; accentBorder = 'border-amber-500'; accentBg = 'bg-amber-600/20'; accentText = 'text-amber-300'; }
          return `
            <div class="fest-card p-5 border-l-4 ${accentBorder} ${accentBg} flex flex-col items-center text-center space-y-2">
              <div class="text-4xl">${medal}</div>
              <div class="text-xl font-extrabold ${accentText}">${r.studentPosition}</div>
              <h4 class="text-base font-bold text-white">${r.programName}</h4>
              <span class="text-xs text-gray-300">${r.category}</span>
              <div class="text-sm font-semibold text-yellow-200">${r.studentPoints} Points</div>
            </div>`;
        }).join("");
      }
    }
  }

  renderScheduleView() {
    const user = window.authManager.getCurrentUser();
    const studentSchedule = window.dataEngine.getScheduleForStudent(user.chestNo);
    const container = document.getElementById("master-schedule-list");
    if (!container) return;

    container.innerHTML = studentSchedule.map(s => `
      <div class="fest-card p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div class="flex items-center space-x-3">
          <div class="px-3 py-2 bg-red-900/60 text-yellow-300 font-bold rounded-lg text-sm border border-red-700/50">
            ${s.code}
          </div>
          <div>
            <h4 class="font-bold text-white text-base">${s.program}</h4>
            <div class="text-xs text-gray-300">Category: <span class="text-yellow-200 font-semibold">${s.category}</span></div>
          </div>
        </div>
        <div class="flex flex-wrap gap-4 text-xs text-gray-300">
          <div>📍 <span class="font-semibold text-white">${s.venue}</span></div>
          <div>📅 <span class="font-semibold text-white">${s.date}</span></div>
          <div>⏰ <span class="font-semibold text-yellow-300">${s.time}</span> (${s.duration})</div>
        </div>
      </div>
    `).join("");
  }

  renderTeamLeaderView() {
    const user = window.authManager.getCurrentUser();
    if (!user || user.role !== "team_leader") return;

    document.getElementById("leader-team-title").textContent = `${user.team} TEAM MANAGEMENT`;
    
    // Team Stats
    const students = window.dataEngine.getStudents().filter(s => s.team.toUpperCase() === user.team.toUpperCase());
    const standings = window.dataEngine.calculateTeamStandings();

    document.getElementById("leader-team-members-count").textContent = students.length;
    document.getElementById("leader-team-total-points").textContent = standings[user.team] || 0;
  }

  handleTeamLeaderSearch(chestNo) {
    const accessCheck = window.authManager.canAccessStudent(chestNo);
    const resultBox = document.getElementById("team-search-result-box");
    if (!resultBox) return;

    if (!accessCheck.allowed) {
      resultBox.innerHTML = `
        <div class="p-4 bg-red-900/40 border border-red-600/60 rounded-xl text-red-200 text-sm">
          <div class="font-bold mb-1">🚫 Access Denied</div>
          <div>${accessCheck.reason}</div>
        </div>
      `;
      return;
    }

    const student = accessCheck.student;
    const points = window.dataEngine.calculateStudentPoints(student.chestNo);
    const arts = window.dataEngine.getProgramsForStudent(student.chestNo);
    const sports = window.dataEngine.getSportsForStudent(student.chestNo);
    const schedule = window.dataEngine.getScheduleForStudent(student.chestNo);

    resultBox.innerHTML = `
      <div class="fest-card p-6 border-l-4 border-yellow-300">
        <div class="flex items-center space-x-4 mb-4">
          <img src="${window.dataEngine.getGoogleDriveImageUrl(student.driveId) || 'assets/logo-gold.jpg'}" 
               class="w-16 h-16 rounded-full border-2 border-yellow-300 object-cover"
               onerror="this.src='assets/logo-gold.jpg'" />
          <div>
            <h3 class="text-xl font-bold text-white">${student.name}</h3>
            <div class="text-xs text-yellow-300 font-semibold">Chest No: ${student.chestNo} | Class: ${student.class}</div>
            <div class="text-xs text-gray-300">Category: ${student.category} | Team: <span class="font-bold text-green-400">${student.team}</span></div>
          </div>
          <div class="ml-auto text-right">
            <div class="text-2xl font-extrabold text-yellow-300">${points}</div>
            <div class="text-xs text-gray-400">Total Points</div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mt-4">
          <div class="p-3 bg-gray-800/80 rounded-lg">
            <h4 class="font-bold text-yellow-300 mb-2">Arts Programs (${arts.length})</h4>
            ${arts.length > 0 ? arts.map(a => `<div class="mb-1 text-white">• [${a.code}] ${a.program} (${a.type})</div>`).join("") : `<div class="text-gray-400 italic">None</div>`}
          </div>

          <div class="p-3 bg-gray-800/80 rounded-lg">
            <h4 class="font-bold text-yellow-300 mb-2">Sports Events (${sports.length})</h4>
            ${sports.length > 0 ? sports.map(s => `<div class="mb-1 text-white">• ${s.programName} (${s.category})</div>`).join("") : `<div class="text-gray-400 italic">None</div>`}
          </div>
        </div>
      </div>
    `;
  }

  renderLeaderboardView() {
    const standings = window.dataEngine.calculateTeamStandings();
    const sortedTeams = Object.entries(standings).sort((a, b) => b[1] - a[1]);
    const maxPoints = Math.max(...Object.values(standings), 1);

    const standingsContainer = document.getElementById("team-standings-list");
    if (standingsContainer) {
      standingsContainer.innerHTML = sortedTeams.map(([team, pts], rank) => {
        const percentage = Math.round((pts / maxPoints) * 100);
        return `
          <div class="fest-card p-4">
            <div class="flex justify-between items-center mb-2">
              <div class="flex items-center space-x-3">
                <span class="w-7 h-7 flex items-center justify-center rounded-full font-extrabold text-sm ${rank === 0 ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-white'}">
                  #${rank + 1}
                </span>
                <span class="font-bold text-lg text-white">${team}</span>
              </div>
              <span class="text-xl font-extrabold text-yellow-300">${pts} <span class="text-xs font-normal text-gray-400">Pts</span></span>
            </div>
            <div class="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div class="h-3 rounded-full bg-gradient-to-r from-red-600 to-yellow-400 transition-all duration-500" style="width: ${percentage}%"></div>
            </div>
          </div>
        `;
      }).join("");
    }
  }

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove("hidden");
  }

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add("hidden");
  }

  showToast(message, type = "info") {
    const toast = document.createElement("div");
    let bg = "bg-gray-800 border-yellow-300 text-white";
    if (type === "error") bg = "bg-red-900 border-red-500 text-white";
    if (type === "success") bg = "bg-green-900 border-green-400 text-white";

    toast.className = `fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-xl border shadow-2xl text-sm font-semibold transition-all duration-300 opacity-0 translate-y-2 ${bg}`;
    toast.textContent = message;

    document.body.appendChild(toast);
    setTimeout(() => toast.classList.remove("opacity-0", "translate-y-2"), 50);
    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

window.appController = new AppController();
