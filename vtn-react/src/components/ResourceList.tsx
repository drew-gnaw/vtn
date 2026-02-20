import { useState, useEffect } from "react";
import { type Resource } from "../constants/interface";
import "../App.css";
import "../index.css";
import BACKEND_URL from "../lib/backend";
import CategoryList from "./CategoryList";
import AddResourceModal from "./AddResourceModal";
import LoginModal from "./LoginModal";

export default function ResourceList() {
  // Initialize States
  const [resources, setResources] = useState<Resource[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminView, setAdminView] = useState<"user" | "admin">("user");
  const [pendingResources, setPendingResources] = useState<Resource[]>([]);

  // Check admin login status on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("vtn:adminToken");
      setIsAdmin(Boolean(token));
    } catch {
      setIsAdmin(false);
    }
  }, []);

  // Re-check admin status when login modal closes
  const handleLoginClose = () => {
    setShowLogin(false);
    try {
      const token = localStorage.getItem("vtn:adminToken");
      setIsAdmin(Boolean(token));
    } catch {
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    try { localStorage.removeItem("vtn:adminToken"); } catch {}
    setIsAdmin(false);
    setAdminView("user");
  };

  // Fetch pending resources when admin view is active
  useEffect(() => {
    if (adminView !== "admin") return;
    let token = "";
    try { token = localStorage.getItem("vtn:adminToken") || ""; } catch {}
    fetch(BACKEND_URL + "/api/admin/resources", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: any[]) => {
        const mapped: Resource[] = data.map((d) => ({
          id: d._id,
          title: d.name,
          description: d.description,
          link: d.link,
          phone: d.phone_number,
          categories: Array.isArray(d.categories) ? d.categories : [],
        }));
        setPendingResources(mapped);
      })
      .catch((err) => console.error("Failed to fetch pending resources", err));
  }, [adminView]);

  // Fetch resources from backend on mount
  useEffect(() => {
    fetch(BACKEND_URL + "/api/resources")
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((data: any[]) => {
        const mapped: Resource[] = data.map((d) => ({
          id: d._id,
          title: d.name,
          description: d.description,
          link: d.link,
          phone: d.phone_number,
          categories: Array.isArray(d.categories) ? d.categories : [],
        }));
        setResources(mapped);
      })
      .catch((err) => console.error("Failed to fetch resources", err));
  }, []);

  useEffect(() => {
    // detect touch-capable / mobile devices
    try {
      const nav = typeof navigator !== "undefined" ? navigator : null;
      const touch =
        nav &&
        ((nav.maxTouchPoints && nav.maxTouchPoints > 0) ||
          /Mobi|Android|iPhone|iPad|iPod/i.test(nav.userAgent));
      setIsMobile(Boolean(touch));
    } catch {
      setIsMobile(false);
    }
  }, []);

  const copyToClipboard = async (text: string) => {
    if (!text) return;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      window.dispatchEvent(new CustomEvent("vtn:copied", { detail: "Copied" }));
    } catch (err) {
      // ignore
    }
  };

  const handleAdminAction = async (resourceId: string, approve: boolean) => {
    let token = "";
    try { token = localStorage.getItem("vtn:adminToken") || ""; } catch {}
    try {
      const res = await fetch(BACKEND_URL + "/api/admin/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: resourceId, approve }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || res.statusText);
      }
      
      setPendingResources((prev) => prev.filter((r) => r.id !== resourceId));
      window.dispatchEvent(
        new CustomEvent("vtn:copied", {
          detail: approve ? "Resource approved" : "Resource declined",
        }),
      );
    } catch (err: any) {
      console.error("Admin action failed", err);
      window.dispatchEvent(
        new CustomEvent("vtn:copied", {
          detail: err?.message || "Action failed",
        }),
      );
    }
  };

  // Pick the active resource list based on the current view
  const activeResources = adminView === "admin" ? pendingResources : resources;

  // Extract unique categories from the active resource list and include "All"
  const uniqueCategories = [
    "All",
    ...Array.from(
      new Set(activeResources.flatMap((resource) => resource.categories)),
    ),
  ];

  // Filter resources based on selected category
  const filteredResources =
    filter === "All"
      ? activeResources
      : activeResources.filter((resource) => resource.categories.includes(filter));

  // Set filter depends on tile selected
  const handleFilter = (category: string) => {
    setFilter(category);
  };

  return (
    <div className="ResourcePage">
      <CategoryList
        categories={uniqueCategories}
        selected={filter}
        onSelect={handleFilter}
      />

      <div className="ResourcesPanel">
        <div className="ResourcesHeaderRow">
          <div className="ResourcesTop">
            <h2 className="ResourcesTitle">Resources</h2>
            <div className="CategoryIndicator">
              Category: <strong>{filter}</strong>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 8,
            }}
          >
            <button className="AddResource" onClick={() => setShowAdd(true)}>
              Add Resource
            </button>
            {isAdmin ? (
              <div className="AdminViewSwitch">
                <button
                  className={`AdminViewOption${adminView === "user" ? " AdminViewOptionActive" : ""}`}
                  onClick={() => { setAdminView("user"); setFilter("All"); }}
                >
                  User View
                </button>
                <button
                  className={`AdminViewOption${adminView === "admin" ? " AdminViewOptionActive" : ""}`}
                  onClick={() => { setAdminView("admin"); setFilter("All"); }}
                >
                  Admin Panel
                </button>
                <button
                  className="AdminLogoutBtn"
                  onClick={handleLogout}
                  title="Log out"
                  aria-label="Log out"
                >
                  ✕
                </button>
              </div>
            ) : (
              <button className="AddResource" onClick={() => setShowLogin(true)}>
                Admin Login
              </button>
            )}
          </div>
        </div>

        <div className="ResourceList">
          {adminView === "admin" && filteredResources.length === 0 && (
            <div className="EmptyPendingMessage">No pending resources</div>
          )}
          {filteredResources.map((resource, index) => {
            const content = (
              <>
                <div className="ResourceTitle">{resource.title}</div>
                {resource.description && (
                  <p className="ResourceDescription">{resource.description}</p>
                )}
                {resource.phone && (
                  <p className="ResourcePhone">
                    {isMobile ? (
                      <a
                        className="ResourcePhoneLink"
                        href={`tel:${formatTel(resource.phone)}`}
                      >
                        {resource.phone}
                      </a>
                    ) : (
                      <button
                        className="ResourcePhoneCopy"
                        onClick={(e: any) => {
                          e.stopPropagation();
                          e.preventDefault();
                          copyToClipboard(formatTel(resource.phone));
                        }}
                        onKeyDown={(e: any) => {
                          e.stopPropagation();
                        }}
                      >
                        {resource.phone}
                      </button>
                    )}
                  </p>
                )}
                {resource.categories.length > 0 && (
                  <div className="ResourceCategories">
                    {resource.categories.join(", ")}
                  </div>
                )}
              </>
            );

            const openLink = (e: any) => {
              // allow normal link clicks to behave
              if (e?.target?.closest?.("a")) return;
              window.open(resource.link, "_blank", "noopener");
            };

            const adminButtons = adminView === "admin" && resource.id && (
              <div className="AdminActions">
                <button
                  className="AdminActionBtn AdminApproveBtn"
                  title="Approve"
                  aria-label="Approve resource"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAdminAction(resource.id!, true);
                  }}
                >
                  ✓
                </button>
                <button
                  className="AdminActionBtn AdminDeclineBtn"
                  title="Decline"
                  aria-label="Decline resource"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleAdminAction(resource.id!, false);
                  }}
                >
                  ✕
                </button>
              </div>
            );

            return resource.link ? (
              <div
                key={index}
                className="ResourceCard ResourceCardClickable"
                role="link"
                tabIndex={0}
                onClick={openLink}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openLink(e);
                }}
              >
                {content}
                <div>
                  <a
                    className="ResourceLink"
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {resource.link}
                  </a>
                </div>
                {adminButtons}
              </div>
            ) : (
              <div key={index} className="ResourceCard">
                {content}
                {adminButtons}
              </div>
            );
          })}
        </div>
      </div>
      <AddResourceModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        initialCategories={uniqueCategories}
      />
      <LoginModal visible={showLogin} onClose={handleLoginClose} />
    </div>
  );
}

// local state inserted near top of file

function formatTel(phone?: string) {
  if (!phone) return "";
  // keep leading + if present, remove all other non-digit characters
  const trimmed = phone.trim();
  const leadingPlus = trimmed.startsWith("+") ? "+" : "";
  return leadingPlus + trimmed.replace(/[^0-9]/g, "");
}
