"use client";
import Image from "next/image";
import React, { useState } from "react";
import type { GitHubUsersType } from "../types/GitHubUsers.types";

type GitHubUsersProps = {
  users: GitHubUsersType[];
};

const GitHubUsers = ({ users }: GitHubUsersProps) => {
  console.log("🚀 ~ GitHubUsers ~ users:", users)
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>GitHub Users</h1>
      {!users.length ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
            }}
          >
            {currentUsers.map((user) => (
              <div
                key={user.id}
                style={{
                  textAlign: "center",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <Image
                  src={user.avatar_url}
                  alt={user.login}
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                  }}
                  width={100}
                  height={100}
                />
                <p>{user.login}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#007bff" }}
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              type="button"
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              type="button"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GitHubUsers;
