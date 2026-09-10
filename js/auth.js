/**
 * Ummath APP - Waltakun'26 Authentication Module
 * Manages Student & Team Leader sessions, team-scoped access control.
 */

const TEAM_LEADERS = [
  { username: "QIYADAH", team: "QIYADAH", role: "team_leader" },
  { username: "SIYADAH", team: "SIYADAH", role: "team_leader" },
  { username: "WIFADAH", team: "WIFADAH", role: "team_leader" },
  { username: "RIFADAH", team: "RIFADAH", role: "team_leader" }
];

class AuthManager {
  constructor() {
    this.currentUser = JSON.parse(sessionStorage.getItem("ummath_user")) || null;
  }

  login(identifier, password) {
    const cleanId = String(identifier).trim();
    const cleanPass = String(password).trim();

    // 1. Check Team Leader Accounts
    const leaderMatch = TEAM_LEADERS.find(l => l.username.toUpperCase() === cleanId.toUpperCase());
    if (leaderMatch) {
      if (cleanPass === "teammanager") {
        this.currentUser = {
          role: "team_leader",
          username: leaderMatch.username,
          team: leaderMatch.team,
          name: `${leaderMatch.team} Team Leader`
        };
        sessionStorage.setItem("ummath_user", JSON.stringify(this.currentUser));
        return { success: true, role: "team_leader", user: this.currentUser };
      } else {
        return { success: false, message: "Invalid password for Team Leader account." };
      }
    }

    // 2. Check Student Accounts
    const student = window.dataEngine.getStudentByChest(cleanId);
    if (student) {
      const activePassword = student.password || student.chestNo;
      if (cleanPass === activePassword) {
        this.currentUser = {
          role: "student",
          chestNo: student.chestNo,
          name: student.name,
          class: student.class,
          category: student.category,
          team: student.team,
          driveId: student.driveId
        };
        sessionStorage.setItem("ummath_user", JSON.stringify(this.currentUser));
        return { success: true, role: "student", user: this.currentUser };
      } else {
        return { success: false, message: "Incorrect password. Default is your Chest Number." };
      }
    }

    return { success: false, message: "Chest Number or Username not found." };
  }

  logout() {
    this.currentUser = null;
    sessionStorage.removeItem("ummath_user");
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return this.currentUser !== null;
  }

  isStudent() {
    return this.currentUser && this.currentUser.role === "student";
  }

  isTeamLeader() {
    return this.currentUser && this.currentUser.role === "team_leader";
  }

  canAccessStudent(targetChestNo) {
    if (this.isStudent()) {
      return String(this.currentUser.chestNo).trim() === String(targetChestNo).trim();
    }
    if (this.isTeamLeader()) {
      const student = window.dataEngine.getStudentByChest(targetChestNo);
      if (!student) return { allowed: false, reason: "Student not found" };
      
      if (student.team.toUpperCase() === this.currentUser.team.toUpperCase()) {
        return { allowed: true, student };
      } else {
        return {
          allowed: false,
          reason: `Access Restricted: You are Team Leader for ${this.currentUser.team}. Chest #${targetChestNo} (${student.name}) belongs to team ${student.team}.`
        };
      }
    }
    return { allowed: false, reason: "Not authenticated" };
  }
}

window.authManager = new AuthManager();
