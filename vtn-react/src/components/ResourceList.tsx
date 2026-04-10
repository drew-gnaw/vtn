import { useState, useEffect } from "react";
import { type Resource } from "../constants/interface";
import "../App.css";
import "../index.css";
import BACKEND_URL from "../lib/backend";
import CategoryList from "./CategoryList";
import AddResourceModal from "./AddResourceModal";
import EditResourceModal from "./EditResourceModal";
import LoginModal from "./LoginModal";

export default function ResourceList() {
  // Initialize States
  const [resources, setResources] = useState<Resource[]>([]);
  const [filter, setFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"alphabetical" | "entry">("entry");
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [adminView, setAdminView] = useState<"user" | "admin">("user");
  const [pendingResources, setPendingResources] = useState<Resource[]>([]);
  const [isResourcesLoading, setIsResourcesLoading] = useState<boolean>(true);
  const [isPendingLoading, setIsPendingLoading] = useState<boolean>(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

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
    setIsPendingLoading(true);
    fetch(BACKEND_URL + "/api/admin", {
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
      .catch((err) => console.error("Failed to fetch pending resources", err))
      .finally(() => setIsPendingLoading(false));
  }, [adminView]);

  // Fetch resources from backend on mount
  useEffect(() => {
    setIsResourcesLoading(true);
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
      .catch((err) => console.error("Failed to fetch resources", err))
      .finally(() => setIsResourcesLoading(false));
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
      const res = await fetch(BACKEND_URL + "/api/admin", {
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

  const handleEditResource = (resource: Resource) => {
    if (adminView === "admin") {
      setEditingResource(resource);
      setShowEditModal(true);
    }
  };

  const handleSaveEdit = async (resourceId: string, updates: Partial<Resource>) => {
    let token = "";
    try { token = localStorage.getItem("vtn:adminToken") || ""; } catch {}
    try {
      const res = await fetch(BACKEND_URL + "/api/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: resourceId,
          name: updates.title,
          description: updates.description,
          link: updates.link,
          phone_number: updates.phone,
          categories: updates.categories,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || res.statusText);
      }
      
      setPendingResources((prev) =>
        prev.map((r) =>
          r.id === resourceId
            ? {
                ...r,
                title: updates.title || r.title,
                description: updates.description || r.description,
                link: updates.link || r.link,
                phone: updates.phone || r.phone,
                categories: updates.categories || r.categories,
              }
            : r
        )
      );
    } catch (err: any) {
      throw new Error(err?.message || "Failed to save resource");
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
  const categoryFilteredResources =
    filter === "All"
      ? activeResources
      : activeResources.filter((resource) => resource.categories.includes(filter));

  const searchFilteredResources = searchQuery.trim().toLowerCase();
  const filteredResources = searchFilteredResources
    ? categoryFilteredResources.filter((resource) => {
        const haystack = [
          resource.title,
          resource.description,
          resource.link,
          resource.phone,
          resource.categories.join(" "),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return haystack.includes(searchFilteredResources);
      })
    : categoryFilteredResources;

  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.title.localeCompare(b.title, undefined, {
        sensitivity: "base",
        numeric: true,
      });
    }

    return activeResources.indexOf(a) - activeResources.indexOf(b);
  });

  const isLoadingActive = adminView === "admin" ? isPendingLoading : isResourcesLoading;

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

        <div className="ResourceSearchBar">
          <div className="ResourceSearchControls">
            <input
              className="ResourceSearchInput"
              type="search"
              placeholder="Search resources"
              aria-label="Search resources"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              className="ResourceSortSelect"
              aria-label="Sort resources"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "alphabetical" | "entry")}
            >
              <option value="alphabetical">Alphabetical</option>
              <option value="entry">Date of entry</option>
            </select>
          </div>
        </div>

        <div className="ResourceList">
          {isLoadingActive ? (
            <div className="ResourceLoading" role="status" aria-live="polite" aria-label="Loading resources">
              <div className="ResourceSpinner" aria-hidden="true" />
              <div className="ResourceLoadingText">Loading resources...</div>
            </div>
          ) : (
            <>
              {sortedResources.length === 0 && (
                <div className="EmptyPendingMessage">
                  {adminView === "admin"
                    ? searchFilteredResources
                      ? "No pending resources match your search"
                      : "No pending resources"
                    : searchFilteredResources
                      ? "No resources match your search"
                      : "No resources available"}
                </div>
              )}
              {sortedResources.map((resource, index) => {
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
                  className="AdminActionBtn AdminEditBtn"
                  title="Edit"
                  aria-label="Edit resource"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    e.preventDefault();
                    handleEditResource(resource);
                  }}
                >
                  ✎
                </button>
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
            </>
          )}
        </div>
      </div>
      <AddResourceModal
        visible={showAdd}
        onClose={() => setShowAdd(false)}
        initialCategories={uniqueCategories}
      />
      <EditResourceModal
        visible={showEditModal}
        resource={editingResource}
        onClose={() => { setShowEditModal(false); setEditingResource(null); }}
        onSave={handleSaveEdit}
        availableCategories={uniqueCategories}
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
