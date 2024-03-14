// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route, PrivateSet } from '@redwoodjs/router'

import DefaultLayout from 'src/layouts/DefaultLayout/DefaultLayout'
import ScaffoldLayout from 'src/layouts/ScaffoldLayout'

import { useAuth } from './auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <PrivateSet unauthenticated="unauthorized">
        <Set wrap={DefaultLayout}>
          <Route path="/" page={HomePage} name="home" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Projects" titleTo="projects" buttonLabel="New Project" buttonTo="newProject">
          <Route path="/projects/new" page={ProjectNewProjectPage} name="newProject" />
          <Route path="/projects/{id:Int}/edit" page={ProjectEditProjectPage} name="editProject" />
          <Route path="/projects/{id:Int}" page={ProjectProjectPage} name="project" />
          <Route path="/projects" page={ProjectProjectsPage} name="projects" />
        </Set>
        <Set wrap={ScaffoldLayout} title="Allocations" titleTo="allocations" buttonLabel="New Allocation" buttonTo="newAllocation">
          {/* <Route path="/" title="Allocations" page={AllocationAllocationsPage} name="home" /> */}
          <Route path="/allocations/new" page={AllocationNewAllocationPage} name="newAllocation" />
          <Route path="/allocations/{id:Int}/edit" page={AllocationEditAllocationPage} name="editAllocation" />
          <Route path="/allocations/{id:Int}" page={AllocationAllocationPage} name="allocation" />
          <Route path="/allocations" page={AllocationAllocationsPage} name="allocations" />
        </Set>
        <Set wrap={ScaffoldLayout} title="People" titleTo="people" buttonLabel="New Person" buttonTo="newPerson">
          <Route path="/people/new" page={PersonNewPersonPage} name="newPerson" />
          <Route path="/people/{id:Int}/edit" page={PersonEditPersonPage} name="editPerson" />
          <Route path="/people/{id:Int}" page={PersonPersonPage} name="person" />
          <Route path="/people" page={PersonPeoplePage} name="people" />
        </Set>
      </PrivateSet>
      <Route path="/unauthorized" page={UnauthorizedPage} name="unauthorized" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
