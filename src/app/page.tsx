import styles from "./page.module.css";
import GitHubUsers from "./components/GitHubUsers";
import type { GitHubUsersType } from "./types/GitHubUsers.types";

async function fetchUsers(): Promise<GitHubUsersType[]> {
  const response = await fetch('https://api.github.com/users?per_page=100', {
    next: { revalidate: 60 },
  });
  console.log("🚀 ~ fetchUsers ~ response:", response)

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
}

export default async function Home() {
  const users = await fetchUsers();
  console.log("🚀 ~ Home ~ users:", users)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <GitHubUsers users={users} />
      </main>
    </div>
  );
}
