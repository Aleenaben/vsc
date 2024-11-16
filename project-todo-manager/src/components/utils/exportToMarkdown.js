export const exportToMarkdown = (project) => {
    let markdown = `# Project Title: ${project.title}\n\n## Todos\n\n`;
    markdown += '| Description | Status | Created Date | Updated Date |\n';
    markdown += '|-------------|--------|--------------|--------------|\n';
  
    project.todos.forEach((todo) => {
      markdown += `| ${todo.description} | ${todo.status} | ${new Date(todo.created_date).toLocaleString()} | ${new Date(todo.updated_date).toLocaleString()} |\n`;
    });
  
    markdown += `\n## Project Details:\n- Created on: ${new Date(project.created_date).toLocaleString()}\n`;
  
    return markdown;
  };
  