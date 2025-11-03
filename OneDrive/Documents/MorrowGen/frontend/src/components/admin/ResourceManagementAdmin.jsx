import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Edit, 
  Trash2, 
  Archive, 
  ArchiveRestore,
  Eye,
  Upload,
  FileText,
  Video,
  Image,
  Music,
  Link,
  File,
  Calendar,
  User,
  TrendingUp,
  RefreshCw,
  MoreVertical
} from 'lucide-react';
import ResourceUploadForm from './ResourceUploadForm';

const ResourceManagementAdmin = () => {
  const [resources, setResources] = useState([]);
  const [studySpaces, setStudySpaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudySpace, setSelectedStudySpace] = useState('');
  const [selectedResourceType, setSelectedResourceType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedResources, setSelectedResources] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [stats, setStats] = useState({
    totalResources: 0,
    totalDownloads: 0,
    activeResources: 0,
    archivedResources: 0
  });
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');

  const resourceTypes = [
    { value: 'document', label: 'Document', icon: FileText, color: '#0097B2' },
    { value: 'video', label: 'Video', icon: Video, color: '#00B2A9' },
    { value: 'image', label: 'Image', icon: Image, color: '#0097B2' },
    { value: 'audio', label: 'Audio', icon: Music, color: '#00B2A9' },
    { value: 'link', label: 'External Link', icon: Link, color: '#0097B2' },
    { value: 'other', label: 'Other', icon: File, color: '#00B2A9' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active', color: '#00B2A9' },
    { value: 'archived', label: 'Archived', color: '#D9D9D9' },
    { value: 'deleted', label: 'Deleted', color: '#FF6B6B' }
  ];

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockResources = [
      {
        id: '1',
        title: 'JavaScript Fundamentals Guide',
        description: 'Comprehensive guide covering JavaScript basics and advanced concepts',
        resourceType: 'document',
        fileName: 'js-fundamentals.pdf',
        fileSize: 2048576,
        uploadedBy: { name: 'John Doe', id: 1 },
        studySpace: { name: 'Web Development', id: '1' },
        tags: ['JavaScript', 'Programming', 'Beginner'],
        isPublic: true,
        downloadCount: 145,
        status: 'active',
        createdAt: '2024-03-15T10:30:00Z',
        updatedAt: '2024-03-15T10:30:00Z'
      },
      {
        id: '2',
        title: 'React Tutorial Video Series',
        description: 'Complete React tutorial series from basics to advanced',
        resourceType: 'video',
        externalUrl: 'https://youtube.com/watch?v=example',
        uploadedBy: { name: 'Jane Smith', id: 2 },
        studySpace: { name: 'Frontend Development', id: '2' },
        tags: ['React', 'JavaScript', 'Tutorial'],
        isPublic: true,
        downloadCount: 89,
        status: 'active',
        createdAt: '2024-03-14T15:20:00Z',
        updatedAt: '2024-03-14T15:20:00Z'
      },
      {
        id: '3',
        title: 'Database Design Principles',
        description: 'Essential principles for designing efficient databases',
        resourceType: 'document',
        fileName: 'db-design.docx',
        fileSize: 1536000,
        uploadedBy: { name: 'Mike Johnson', id: 3 },
        studySpace: { name: 'Database Management', id: '3' },
        tags: ['Database', 'Design', 'SQL'],
        isPublic: false,
        downloadCount: 67,
        status: 'archived',
        createdAt: '2024-03-13T09:45:00Z',
        updatedAt: '2024-03-13T09:45:00Z'
      }
    ];

    const mockStudySpaces = [
      { id: '1', name: 'Web Development' },
      { id: '2', name: 'Frontend Development' },
      { id: '3', name: 'Database Management' },
      { id: '4', name: 'Mobile Development' }
    ];

    setTimeout(() => {
      setResources(mockResources);
      setStudySpaces(mockStudySpaces);
      setStats({
        totalResources: 156,
        totalDownloads: 2843,
        activeResources: 134,
        archivedResources: 22
      });
      setLoading(false);
    }, 1000);
  }, []);

  const getResourceIcon = (type) => {
    const resourceType = resourceTypes.find(rt => rt.value === type);
    return resourceType ? resourceType.icon : File;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedResources = resources
    .filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStudySpace = !selectedStudySpace || resource.studySpace.id === selectedStudySpace;
      const matchesType = !selectedResourceType || resource.resourceType === selectedResourceType;
      const matchesStatus = !selectedStatus || resource.status === selectedStatus;
      
      return matchesSearch && matchesStudySpace && matchesType && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      
      if (sortField === 'studySpace') {
        aValue = a.studySpace.name;
        bValue = b.studySpace.name;
      } else if (sortField === 'uploadedBy') {
        aValue = a.uploadedBy.name;
        bValue = b.uploadedBy.name;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

  const handleResourceSelect = (resourceId) => {
    setSelectedResources(prev => 
      prev.includes(resourceId)
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleSelectAll = () => {
    setSelectedResources(
      selectedResources.length === filteredAndSortedResources.length
        ? []
        : filteredAndSortedResources.map(r => r.id)
    );
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="stat-card">
      <div className="stat-icon" style={{ backgroundColor: `${color}20`, color }}>
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value.toLocaleString()}</h3>
        <p className="stat-title">{title}</p>
      </div>
    </div>
  );

  const ActionButton = ({ onClick, icon: Icon, label, variant = 'secondary', disabled = false }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`action-btn ${variant} ${disabled ? 'disabled' : ''}`}
      title={label}
    >
      <Icon size={16} />
    </button>
  );

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading-container">
          <RefreshCw className="loading-spinner" size={32} />
          <p>Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <style jsx>{`
        :root {
          --color-primary: #0097B2;
          --color-secondary: #00B2A9;
          --color-tertiary: #F2F2F2;
          --color-backGray: #F2F2F2;
          --color-skeleton: #D9D9D9;
          --color-primary-100: #E0F2F5;
          --color-primary-200: #B3E0E9;
        }

        .admin-container {
          padding: 24px;
          background-color: var(--color-backGray);
          min-height: 100vh;
        }

        .admin-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 24px;
        }

        .admin-title {
          font-size: 28px;
          font-weight: 700;
          color: #1f2937;
          margin: 0;
        }

        .primary-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-primary);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .primary-btn:hover {
          background-color: #007a94;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          flex: 1;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin: 0 0 4px 0;
        }

        .stat-title {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .controls-section {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .search-filters-row {
          display: flex;
          gap: 16px;
          margin-bottom: 16px;
          flex-wrap: wrap;
        }

        .search-container {
          position: relative;
          flex: 1;
          min-width: 300px;
        }

        .search-input {
          width: 100%;
          padding: 12px 12px 12px 40px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
        }

        .search-input:focus {
          outline: none;
          border-color: var(--color-primary);
          box-shadow: 0 0 0 3px var(--color-primary-100);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .filter-btn:hover {
          border-color: var(--color-primary);
          background-color: var(--color-primary-100);
        }

        .filter-btn.active {
          background-color: var(--color-primary);
          color: white;
          border-color: var(--color-primary);
        }

        .filters-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
          margin-top: 16px;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-label {
          font-size: 14px;
          font-weight: 600;
          color: #374151;
        }

        .filter-select {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 14px;
        }

        .filter-select:focus {
          outline: none;
          border-color: var(--color-primary);
        }

        .table-container {
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .table-header {
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .table-title {
          font-size: 18px;
          font-weight: 600;
          color: #1f2937;
          margin: 0;
        }

        .bulk-actions {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .bulk-text {
          font-size: 14px;
          color: #6b7280;
        }

        .resource-table {
          width: 100%;
          border-collapse: collapse;
        }

        .table-head {
          background-color: var(--color-tertiary);
        }

        .table-head th {
          padding: 12px 16px;
          text-align: left;
          font-weight: 600;
          color: #374151;
          font-size: 14px;
          cursor: pointer;
          user-select: none;
        }

        .table-head th:hover {
          background-color: var(--color-skeleton);
        }

        .sort-header {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .table-row {
          border-bottom: 1px solid #f3f4f6;
          transition: background-color 0.2s;
        }

        .table-row:hover {
          background-color: var(--color-primary-100);
        }

        .table-cell {
          padding: 16px;
          font-size: 14px;
          color: #374151;
          vertical-align: top;
        }

        .checkbox-cell {
          width: 48px;
          padding: 16px 12px;
        }

        .checkbox {
          width: 16px;
          height: 16px;
          accent-color: var(--color-primary);
        }

        .resource-info {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .resource-icon {
          width: 40px;
          height: 40px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .resource-details {
          flex: 1;
          min-width: 0;
        }

        .resource-title {
          font-weight: 600;
          color: #1f2937;
          margin: 0 0 4px 0;
          word-break: break-word;
        }

        .resource-description {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 8px 0;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .resource-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          font-size: 12px;
          color: #6b7280;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .tag {
          background-color: var(--color-primary-100);
          color: var(--color-primary);
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-badge {
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }

        .status-active {
          background-color: #dcfce7;
          color: #15803d;
        }

        .status-archived {
          background-color: #f3f4f6;
          color: #6b7280;
        }

        .status-deleted {
          background-color: #fee2e2;
          color: #dc2626;
        }

        .visibility-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
        }

        .visibility-public {
          background-color: var(--color-primary-100);
          color: var(--color-primary);
        }

        .visibility-private {
          background-color: #fef3c7;
          color: #d97706;
        }

        .actions-cell {
          width: 120px;
        }

        .actions-container {
          display: flex;
          gap: 4px;
          align-items: center;
        }

        .action-btn {
          padding: 6px;
          border: 1px solid transparent;
          border-radius: 6px;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .action-btn:hover {
          background-color: var(--color-primary-100);
          border-color: var(--color-primary);
        }

        .action-btn.primary {
          background-color: var(--color-primary);
          color: white;
        }

        .action-btn.primary:hover {
          background-color: #007a94;
        }

        .action-btn.secondary {
          color: #6b7280;
        }

        .action-btn.danger {
          color: #dc2626;
        }

        .action-btn.danger:hover {
          background-color: #fee2e2;
          border-color: #dc2626;
        }

        .action-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          color: var(--color-primary);
        }

        .loading-spinner {
          animation: spin 1s linear infinite;
          margin-bottom: 16px;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .empty-state {
          text-align: center;
          padding: 64px 32px;
          color: #6b7280;
        }

        .empty-state svg {
          margin-bottom: 16px;
          color: #d1d5db;
        }

        .empty-title {
          font-size: 18px;
          font-weight: 600;
          color: #374151;
          margin: 0 0 8px 0;
        }

        .empty-description {
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 16px;
          }

          .admin-header {
            flex-direction: column;
            gap: 16px;
            align-items: stretch;
          }

          .search-filters-row {
            flex-direction: column;
          }

          .search-container {
            min-width: unset;
          }

          .filters-grid {
            grid-template-columns: 1fr;
          }

          .table-container {
            overflow-x: auto;
          }

          .resource-table {
            min-width: 800px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="admin-header">
        <h1 className="admin-title">Resource Management</h1>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          icon={FileText}
          title="Total Resources"
          value={stats.totalResources}
          color="var(--color-primary)"
        />
        <StatCard
          icon={Download}
          title="Total Downloads"
          value={stats.totalDownloads}
          color="var(--color-secondary)"
        />
        <StatCard
          icon={TrendingUp}
          title="Active Resources"
          value={stats.activeResources}
          color="var(--color-primary)"
        />
        <StatCard
          icon={Archive}
          title="Archived Resources"
          value={stats.archivedResources}
          color="#6b7280"
        />
      </div>

      {/* Search and Filters */}
      <div className="controls-section">
        <div className="search-filters-row">
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search resources by title, description, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button 
            className={`filter-btn ${showFilters ? 'active' : ''}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={20} />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Study Space</label>
              <select
                value={selectedStudySpace}
                onChange={(e) => setSelectedStudySpace(e.target.value)}
                className="filter-select"
              >
                <option value="">All Study Spaces</option>
                {studySpaces.map((space) => (
                  <option key={space.id} value={space.id}>
                    {space.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Resource Type</label>
              <select
                value={selectedResourceType}
                onChange={(e) => setSelectedResourceType(e.target.value)}
                className="filter-select"
              >
                <option value="">All Types</option>
                {resourceTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="filter-select"
              >
                <option value="">All Status</option>
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Resources Table */}
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">
            Resources ({filteredAndSortedResources.length})
          </h2>
          {selectedResources.length > 0 && (
            <div className="bulk-actions">
              <span className="bulk-text">
                {selectedResources.length} selected
              </span>
              <ActionButton
                icon={Archive}
                label="Archive Selected"
                onClick={() => console.log('Archive selected')}
              />
              <ActionButton
                icon={Trash2}
                label="Delete Selected"
                variant="danger"
                onClick={() => console.log('Delete selected')}
              />
            </div>
          )}
        </div>

        {filteredAndSortedResources.length === 0 ? (
          <div className="empty-state">
            <FileText size={64} />
            <h3 className="empty-title">No resources found</h3>
            <p className="empty-description">
              {searchTerm || selectedStudySpace || selectedResourceType
                ? 'Try adjusting your search or filter criteria.'
                : 'Upload your first resource to get started.'}
            </p>
          </div>
        ) : (
          <table className="resource-table">
            <thead className="table-head">
              <tr>
                <th className="checkbox-cell">
                  <input
                    type="checkbox"
                    checked={selectedResources.length === filteredAndSortedResources.length}
                    onChange={handleSelectAll}
                    className="checkbox"
                  />
                </th>
                <th onClick={() => handleSort('title')}>
                  <div className="sort-header">
                    Resource
                    {sortField === 'title' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('studySpace')}>
                  <div className="sort-header">
                    Study Space
                    {sortField === 'studySpace' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('uploadedBy')}>
                  <div className="sort-header">
                    Uploaded By
                    {sortField === 'uploadedBy' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th onClick={() => handleSort('downloadCount')}>
                  <div className="sort-header">
                    Downloads
                    {sortField === 'downloadCount' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th>Status</th>
                <th onClick={() => handleSort('createdAt')}>
                  <div className="sort-header">
                    Created
                    {sortField === 'createdAt' && (
                      <span>{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedResources.map((resource) => {
                const ResourceIcon = getResourceIcon(resource.resourceType);
                const resourceTypeInfo = resourceTypes.find(rt => rt.value === resource.resourceType);
                
                return (
                  <tr key={resource.id} className="table-row">
                    <td className="checkbox-cell">
                      <input
                        type="checkbox"
                        checked={selectedResources.includes(resource.id)}
                        onChange={() => handleResourceSelect(resource.id)}
                        className="checkbox"
                      />
                    </td>
                    <td className="table-cell">
                      <div className="resource-info">
                        <div 
                          className="resource-icon"
                          style={{ 
                            backgroundColor: `${resourceTypeInfo?.color}20`,
                            color: resourceTypeInfo?.color 
                          }}
                        >
                          <ResourceIcon size={20} />
                        </div>
                        <div className="resource-details">
                          <h4 className="resource-title">{resource.title}</h4>
                          {resource.description && (
                            <p className="resource-description">{resource.description}</p>
                          )}
                          <div className="resource-meta">
                            <div className="meta-item">
                              <File size={12} />
                              {resource.fileName || 'External Link'}
                            </div>
                            {resource.fileSize && (
                              <div className="meta-item">
                                {formatFileSize(resource.fileSize)}
                              </div>
                            )}
                            <div className="meta-item">
                              {resource.isPublic ? (
                                <span className="visibility-badge visibility-public">Public</span>
                              ) : (
                                <span className="visibility-badge visibility-private">Private</span>
                              )}
                            </div>
                          </div>
                          {resource.tags.length > 0 && (
                            <div className="tags-container" style={{ marginTop: '8px' }}>
                              {resource.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="tag">{tag}</span>
                              ))}
                              {resource.tags.length > 3 && (
                                <span className="tag">+{resource.tags.length - 3} more</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="meta-item">
                        <span>{resource.studySpace.name}</span>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="meta-item">
                        <User size={14} />
                        {resource.uploadedBy.name}
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="meta-item">
                        <Download size={14} />
                        {resource.downloadCount}
                      </div>
                    </td>
                    <td className="table-cell">
                      <span className={`status-badge status-${resource.status}`}>
                        {resource.status}
                      </span>
                    </td>
                    <td className="table-cell">
                      <div className="meta-item">
                        <Calendar size={14} />
                        {formatDate(resource.createdAt)}
                      </div>
                    </td>
                    <td className="actions-cell">
                      <div className="actions-container">
                        <ActionButton
                          icon={Eye}
                          label="View"
                          onClick={() => console.log('View resource', resource.id)}
                        />
                        <ActionButton
                          icon={Download}
                          label="Download"
                          onClick={() => console.log('Download resource', resource.id)}
                          disabled={!resource.fileUrl}
                        />
                        <ActionButton
                          icon={Edit}
                          label="Edit"
                          onClick={() => console.log('Edit resource', resource.id)}
                        />
                        <ActionButton
                          icon={resource.status === 'archived' ? ArchiveRestore : Archive}
                          label={resource.status === 'archived' ? 'Restore' : 'Archive'}
                          onClick={() => console.log('Toggle archive', resource.id)}
                        />
                        <ActionButton
                          icon={Trash2}
                          label="Delete"
                          variant="danger"
                          onClick={() => console.log('Delete resource', resource.id)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Upload Modal Placeholder */}
  
    </div>
  );
};

export default ResourceManagementAdmin;