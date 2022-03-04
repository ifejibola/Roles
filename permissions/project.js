const { ROLE } = require('../data');

function canViewProject(user, project) {
    // if its admin, or actual user/owner of project, return true!
    return (
        user.role === ROLE.ADMIN || project.userId === user.id
    )
}


// handle which projects users have access to view in the project list all page
function scopedProjects(user, projects) {

    //if admin, view all
    if (user.role === ROLE.ADMIN) return projects
    //else
    return projects.filter(project => project.userId === user.id)
}

function canDeleteProject(user, project) {

    return (
        project.userId === user.id
    )
}
module.exports = {
    canViewProject,
    scopedProjects,
    canDeleteProject
}