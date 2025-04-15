import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiEdit, FiTrash2, FiPlus, FiUsers, FiFileText, FiSettings, FiBarChart2, FiTag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

// Animation variants
const pageVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: { 
      duration: 0.4,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0,
    transition: { 
      duration: 0.3,
    }
  }
};

const childVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  }
};

// Type definitions
interface BlogPost {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  status: 'published' | 'draft';
  views: number;
  comments: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  joinedAt: string;
  role: string;
  posts: number;
  comments: number;
}

type AdminTab = 'posts' | 'users' | 'comments' | 'settings';

// Sample data
const samplePosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Web Development: Trends in 2025',
    author: 'Alex Johnson',
    createdAt: '2025-04-10',
    status: 'published',
    views: 1243,
    comments: 15
  },
  {
    id: 2,
    title: 'Building Scalable Backend Solutions with Modern Architectures',
    author: 'Sarah Chen',
    createdAt: '2025-04-05',
    status: 'published',
    views: 982,
    comments: 8
  },
  {
    id: 3,
    title: 'Machine Learning in Everyday Applications: Practical Examples',
    author: 'Michael Rahman',
    createdAt: '2025-03-28',
    status: 'published',
    views: 756,
    comments: 12
  },
  {
    id: 4,
    title: 'Introduction to Quantum Computing for Developers',
    author: 'Alex Johnson',
    createdAt: '2025-04-15',
    status: 'draft',
    views: 0,
    comments: 0
  }
];

const sampleUsers: User[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    joinedAt: '2024-01-15',
    role: 'Admin',
    posts: 8,
    comments: 23
  },
  {
    id: 2,
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    joinedAt: '2024-02-20',
    role: 'Editor',
    posts: 5,
    comments: 12
  },
  {
    id: 3,
    name: 'Michael Rahman',
    email: 'michael.r@example.com',
    joinedAt: '2024-03-10',
    role: 'Author',
    posts: 3,
    comments: 8
  },
  {
    id: 4,
    name: 'Emily Torres',
    email: 'emily.torres@example.com',
    joinedAt: '2024-04-05',
    role: 'Subscriber',
    posts: 0,
    comments: 15
  }
];

// Styled components
const PageContainer = styled.div`
  padding: 100px 0 60px;
  min-height: 100vh;
`;

const AdminHeader = styled.div`
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const AdminTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const AdminDescription = styled.p`
  color: var(--text-secondary);
`;

const ActionButton = styled(motion.button)`
  padding: 0.7rem 1.5rem;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: var(--primary-light);
    transform: translateY(-2px);
  }
`;

const AdminLayout = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  height: fit-content;
  
  @media (max-width: 992px) {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

const SidebarItem = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: var(--border-radius);
  background-color: ${props => props.active ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-primary)'};
  border: none;
  cursor: pointer;
  text-align: left;
  transition: var(--transition);
  
  &:hover {
    background-color: ${props => props.active ? 'rgba(var(--primary-rgb), 0.15)' : 'rgba(var(--primary-rgb), 0.05)'};
  }
  
  svg {
    font-size: 1.2rem;
    color: ${props => props.active ? 'var(--primary)' : 'var(--text-secondary)'};
  }
  
  @media (max-width: 992px) {
    margin-bottom: 0;
    width: auto;
  }
`;

const ContentArea = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: var(--background);
  border-radius: var(--border-radius);
  padding: 1.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary);
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: var(--text-primary);
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background-color: rgba(var(--primary-rgb), 0.05);
  
  th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    color: var(--text-primary);
    
    &:first-child {
      border-top-left-radius: var(--border-radius);
    }
    
    &:last-child {
      border-top-right-radius: var(--border-radius);
    }
  }
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid var(--border);
    transition: var(--transition);
    
    &:last-child {
      border-bottom: none;
    }
    
    &:hover {
      background-color: rgba(var(--primary-rgb), 0.02);
    }
  }
  
  td {
    padding: 1rem;
    color: var(--text-primary);
  }
`;

const Badge = styled.span<{ type: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 500;
  background-color: ${props => {
    switch (props.type) {
      case 'published':
        return 'rgba(46, 204, 113, 0.15)';
      case 'draft':
        return 'rgba(241, 196, 15, 0.15)';
      case 'Admin':
        return 'rgba(var(--primary-rgb), 0.15)';
      case 'Editor':
        return 'rgba(52, 152, 219, 0.15)';
      case 'Author':
        return 'rgba(155, 89, 182, 0.15)';
      case 'Subscriber':
        return 'rgba(149, 165, 166, 0.15)';
      default:
        return 'rgba(var(--primary-rgb), 0.15)';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'published':
        return '#27ae60';
      case 'draft':
        return '#f39c12';
      case 'Admin':
        return 'var(--primary)';
      case 'Editor':
        return '#3498db';
      case 'Author':
        return '#9b59b6';
      case 'Subscriber':
        return '#7f8c8d';
      default:
        return 'var(--primary)';
    }
  }};
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  cursor: pointer;
  transition: var(--transition);
  
  &:hover {
    background-color: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
    border-color: var(--primary);
  }
`;

const TabContent = styled(motion.div)`
  height: 100%;
`;

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('posts');
  
  // In a real app, these would come from API calls
  const stats = {
    posts: samplePosts.length,
    publishedPosts: samplePosts.filter(post => post.status === 'published').length,
    users: sampleUsers.length,
    totalViews: samplePosts.reduce((total, post) => total + post.views, 0),
  };
  
  // Handle post or user deletion (just UI logic for demo)
  const handleDelete = (id: number, type: 'post' | 'user') => {
    // In a real app, make API call
    alert(`${type === 'post' ? 'Post' : 'User'} with ID ${id} would be deleted in a real app`);
  };
  
  return (
    <PageContainer>
      <div className="container">
        <motion.div
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <AdminHeader>
            <div>
              <AdminTitle>Admin Dashboard</AdminTitle>
              <AdminDescription>Manage your blog content, users, and settings</AdminDescription>
            </div>
            
            <ActionButton 
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <FiPlus /> New Post
            </ActionButton>
          </AdminHeader>
          
          <AdminLayout>
            <Sidebar variants={childVariants}>
              <SidebarItem 
                active={activeTab === 'posts'} 
                onClick={() => setActiveTab('posts')}
              >
                <FiFileText /> Posts
              </SidebarItem>
              <SidebarItem 
                active={activeTab === 'users'} 
                onClick={() => setActiveTab('users')}
              >
                <FiUsers /> Users
              </SidebarItem>
              <SidebarItem 
                active={activeTab === 'comments'} 
                onClick={() => setActiveTab('comments')}
              >
                <FiTag /> Comments
              </SidebarItem>
              <SidebarItem 
                active={activeTab === 'settings'} 
                onClick={() => setActiveTab('settings')}
              >
                <FiSettings /> Settings
              </SidebarItem>
            </Sidebar>
            
            <ContentArea variants={childVariants}>
              {activeTab === 'posts' && (
                <TabContent
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <StatsGrid>
                    <StatCard variants={childVariants}>
                      <StatValue>{stats.posts}</StatValue>
                      <StatLabel><FiFileText /> Total Posts</StatLabel>
                    </StatCard>
                    <StatCard variants={childVariants}>
                      <StatValue>{stats.publishedPosts}</StatValue>
                      <StatLabel><FiFileText /> Published</StatLabel>
                    </StatCard>
                    <StatCard variants={childVariants}>
                      <StatValue>{stats.posts - stats.publishedPosts}</StatValue>
                      <StatLabel><FiFileText /> Drafts</StatLabel>
                    </StatCard>
                    <StatCard variants={childVariants}>
                      <StatValue>{stats.totalViews}</StatValue>
                      <StatLabel><FiBarChart2 /> Total Views</StatLabel>
                    </StatCard>
                  </StatsGrid>
                  
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <tr>
                          <th>Title</th>
                          <th>Author</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Views</th>
                          <th>Actions</th>
                        </tr>
                      </TableHead>
                      <TableBody>
                        {samplePosts.map((post) => (
                          <tr key={post.id}>
                            <td>{post.title}</td>
                            <td>{post.author}</td>
                            <td>{post.createdAt}</td>
                            <td>
                              <Badge type={post.status}>
                                {post.status === 'published' ? 'Published' : 'Draft'}
                              </Badge>
                            </td>
                            <td>{post.views}</td>
                            <td>
                              <ActionButtonsContainer>
                                <IconButton aria-label="Edit post">
                                  <FiEdit size={16} />
                                </IconButton>
                                <IconButton 
                                  aria-label="Delete post"
                                  onClick={() => handleDelete(post.id, 'post')}
                                >
                                  <FiTrash2 size={16} />
                                </IconButton>
                              </ActionButtonsContainer>
                            </td>
                          </tr>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabContent>
              )}
              
              {activeTab === 'users' && (
                <TabContent
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <StatsGrid>
                    <StatCard variants={childVariants}>
                      <StatValue>{stats.users}</StatValue>
                      <StatLabel><FiUsers /> Total Users</StatLabel>
                    </StatCard>
                    <StatCard variants={childVariants}>
                      <StatValue>{sampleUsers.filter(user => user.role === 'Admin').length}</StatValue>
                      <StatLabel><FiUsers /> Admins</StatLabel>
                    </StatCard>
                    <StatCard variants={childVariants}>
                      <StatValue>{sampleUsers.filter(user => ['Editor', 'Author'].includes(user.role)).length}</StatValue>
                      <StatLabel><FiUsers /> Contributors</StatLabel>
                    </StatCard>
                    <StatCard variants={childVariants}>
                      <StatValue>{sampleUsers.filter(user => user.role === 'Subscriber').length}</StatValue>
                      <StatLabel><FiUsers /> Subscribers</StatLabel>
                    </StatCard>
                  </StatsGrid>
                  
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Joined</th>
                          <th>Role</th>
                          <th>Posts</th>
                          <th>Actions</th>
                        </tr>
                      </TableHead>
                      <TableBody>
                        {sampleUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.joinedAt}</td>
                            <td>
                              <Badge type={user.role}>
                                {user.role}
                              </Badge>
                            </td>
                            <td>{user.posts}</td>
                            <td>
                              <ActionButtonsContainer>
                                <IconButton aria-label="Edit user">
                                  <FiEdit size={16} />
                                </IconButton>
                                <IconButton 
                                  aria-label="Delete user"
                                  onClick={() => handleDelete(user.id, 'user')}
                                >
                                  <FiTrash2 size={16} />
                                </IconButton>
                              </ActionButtonsContainer>
                            </td>
                          </tr>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </TabContent>
              )}
              
              {activeTab === 'comments' && (
                <TabContent
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <h2>Comments Management</h2>
                    <p>This section is currently under development.</p>
                  </div>
                </TabContent>
              )}
              
              {activeTab === 'settings' && (
                <TabContent
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <h2>Settings</h2>
                    <p>This section is currently under development.</p>
                  </div>
                </TabContent>
              )}
            </ContentArea>
          </AdminLayout>
        </motion.div>
      </div>
    </PageContainer>
  );
};

export default AdminPage;