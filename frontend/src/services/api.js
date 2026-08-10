async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export function getHealth() {
  return apiRequest('/health');
}

export function getTasks(status = 'all') {
  const query = status === 'all' ? '' : `?status=${status}`;
  return apiRequest(`/api/tasks${query}`);
}

export function createTask(task) {
  return apiRequest('/api/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
}

export function updateTaskStatus(id, status) {
  return apiRequest(`/api/tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
}

export function deleteTask(id) {
  return apiRequest(`/api/tasks/${id}`, {
    method: 'DELETE',
  });
}
