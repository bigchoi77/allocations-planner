import { Link, routes } from '@redwoodjs/router'

import Modal from 'src/components/Modal/Modal'

const getWeeks = () => {
  const weeks = []
  const date = new Date()
  date.setDate(date.getDate() - 7)

  const getMonday = (d) =>
    new Date(d.setDate(d.getDate() - (d.getDay() || 7) + 1))

  for (let i = 1; i < 19; i++) {
    weeks.push(getMonday(date))
    date.setDate(date.getDate() + 7)
  }

  return weeks
}

const getMonths = () => {
  const weeks = getWeeks()
  const months = []
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  for (let i = 0; i < weeks.length; i++) {
    const month = new Date(weeks[i]).getMonth()
    const monthIndex = months.findIndex((m) => m.id === month)

    if (monthIndex === -1) {
      months.push({
        id: month,
        name: monthNames[month],
        colspan: 1,
      })
    } else {
      months[monthIndex].colspan = months[monthIndex].colspan + 1
    }
  }

  return months
}

const getTotalPotentialUtilization = (month, people) => {
  // get total possible work days in a given month
  let maxHours = 0

  for (let i = 0; i < people.length; i++) {
    const country = people[i].maxHoursPerWeek === 40 ? 'singapore' : 'australia'
    const workingDays = getWorkDaysForCountry(country)[month]
    if (people[i].role !== 'delivery-lead')
      maxHours += (people[i].maxHoursPerWeek / 5) * workingDays
  }

  return maxHours
}

const getWorkDaysForCountry = (country) => {
  if (country === 'singapore')
    return [23, 21, 21, 21, 22, 23, 20, 23, 22, 21, 23, 22]
  else if (country === 'australia')
    return [21, 21, 20, 20, 23, 20, 23, 22, 21, 23, 21, 20]
}

const getWorkDatesInRange = (s, e) => {
  let a = []
  for (let d = getNewDate(s); d <= getNewDate(e); d.setDate(d.getDate() + 1)) {
    if (getNewDate(d).getDay() % 6 !== 0) a.push(getNewDate(d))
  }
  return a
}

const getTotalAllocation = (month, allocations, people) => {
  let totalHoursAllocated = 0

  const firstDayOfMonth = new Date('2024', month, 1)
  const lastDayOfMonth = new Date('2024', month + 1, 0)

  for (let i = 0; i < allocations.length; i++) {
    let allocatedDates = 0
    if (
      getNewDate(allocations[i].startDate) <= firstDayOfMonth &&
      getNewDate(allocations[i].endDate) > lastDayOfMonth
    )
      allocatedDates = getWorkDatesInRange(firstDayOfMonth, lastDayOfMonth)
    if (
      getNewDate(allocations[i].startDate) <= firstDayOfMonth &&
      getNewDate(allocations[i].endDate) <= lastDayOfMonth
    )
      allocatedDates = getWorkDatesInRange(
        firstDayOfMonth,
        getNewDate(allocations[i].endDate)
      )
    if (
      getNewDate(allocations[i].startDate) >= firstDayOfMonth &&
      getNewDate(allocations[i].endDate) > lastDayOfMonth
    )
      allocatedDates = getWorkDatesInRange(
        getNewDate(allocations[i].startDate),
        lastDayOfMonth
      )
    if (
      getNewDate(allocations[i].startDate) >= firstDayOfMonth &&
      getNewDate(allocations[i].endDate) <= lastDayOfMonth
    )
      allocatedDates = getWorkDatesInRange(
        getNewDate(allocations[i].startDate),
        getNewDate(allocations[i].endDate)
      )

    if (
      getNewDate(allocations[i].startDate) <= lastDayOfMonth &&
      getNewDate(allocations[i].endDate) >= firstDayOfMonth
    ) {
      let daysAllocated = allocatedDates.length
      const person = getPersonById(allocations[i].personId, people)
      const country = person.maxHoursPerWeek === 40 ? 'singapore' : 'australia'
      const workDays = getWorkDaysForCountry(country)
      if (daysAllocated > workDays) daysAllocated = workDays
      if (person.role !== 'delivery-lead')
        totalHoursAllocated += (person.maxHoursPerWeek / 5) * daysAllocated
    }
  }

  return totalHoursAllocated
}

const getPlannedUtilizationForMonth = (month, allocations, people) => {
  const totalPotentialUtilization = getTotalPotentialUtilization(month, people)
  const totalAllocation = getTotalAllocation(month, allocations, people)
  return Math.round((totalAllocation / totalPotentialUtilization) * 100) + '%'
}

export const getWeekGridCells = () => {
  const weeks = getWeeks()
  const gridCells = []

  for (let i = 0; i < weeks.length; i++) {
    const gridArea = '2 / ' + (i + 2) + ' / 3 / ' + (i + 3)
    gridCells.push(
      <div
        className="week border--bottom border--right"
        key={i}
        style={{ gridArea }}
      >
        {weeks[i].getDate()}
      </div>
    )
  }

  return gridCells
}

export const getCurrentBeach = (allocations, people) => {
  return getWhoIsOnBeach(new Date(), new Date(), allocations, people)
}

const getWhoIsOnBeach = (startDate, endDate, allocations, people) => {
  const beachPeople = []
  const allocatedPeople = []

  for (let i = 0; i < allocations.length; i++) {
    if (
      new Date(allocations[i].startDate) <= endDate &&
      new Date(allocations[i].endDate) >= startDate
    ) {
      const allocatedPerson = getPersonById(allocations[i].personId, people)
      allocatedPeople.push(allocatedPerson)
    }
  }

  for (let i = 0; i < people.length; i++) {
    const hasSameId = (person) => person.id === people[i].id

    if (allocatedPeople.findIndex(hasSameId) === -1) {
      beachPeople.push(people[i])
    }
  }

  return beachPeople.sort((a, b) => a.name.localeCompare(b.name))
}

export const getMonthGridCells = ({ allocations, people }) => {
  const months = getMonths()
  const gridCells = []

  let startColumn
  let endColumn
  let gridArea = ''

  for (let i = 0; i < months.length; i++) {
    if (i === 0) {
      startColumn = 2
      endColumn = months[i].colspan + 2
      gridArea = '1 / ' + startColumn + ' / 2 / ' + endColumn
    } else {
      startColumn = endColumn
      endColumn = startColumn + months[i].colspan
      gridArea = '1 / ' + startColumn + ' / 2 / ' + endColumn
    }
    gridCells.push(
      <div
        className="month border--right"
        key={months[i].id}
        style={{ gridArea }}
      >
        <button
          onClick={() => {
            document
              .querySelector('#modal' + months[i].id)
              .classList.toggle('is-active')
          }}
        >
          {months[i].name}
        </button>
      </div>
    )

    const firstDayOfMonth = new Date('2024', months[i].id, 1)
    const lastDayOfMonth = new Date('2024', months[i].id + 1, 0)
    const beachPeople = getWhoIsOnBeach(
      firstDayOfMonth,
      lastDayOfMonth,
      allocations,
      people
    )

    gridCells.push(
      <Modal key={'modal' + months[i].id} id={'modal' + months[i].id}>
        <h2 className="title is-4">{months[i].name}</h2>
        <h3 className="title is-5 data-heading">Planned Utilization</h3>
        {getPlannedUtilizationForMonth(months[i].id, allocations, people)}
        <h3 className="title is-5 data-heading">On Beach</h3>
        <ul className="beach-people">
          {beachPeople.map((person) => (
            <li key={person.id} className={`person--${person.role}`}>
              {person.photo && (
                <img
                  className="person-image margin--right"
                  src={person.photo}
                  alt={person.name}
                />
              )}
              {person.name}
            </li>
          ))}
        </ul>
      </Modal>
    )
  }

  return gridCells
}

const getAllocationsForProject = (allocations, project, people) => {
  let allocationsForProject = allocations.filter(
    (allocation) => allocation.projectId === project.id
  )
  return allocationsForProject
    .slice()
    .sort((a, b) =>
      getPersonById(a.personId, people).role.localeCompare(
        getPersonById(b.personId, people).role
      )
    )
}

const getNewDate = (date) => {
  let d = new Date(date)
  d = new Date(d.getFullYear(), d.getMonth(), d.getDate())
  d.setHours(0, 0, 0)
  return d
}

const getColumnStart = (allocation, weeks) => {
  const startDate = getNewDate(allocation.startDate)
  const endDate = getNewDate(allocation.endDate)
  if (startDate < getNewDate(weeks[0]) && endDate >= getNewDate(weeks[0]))
    return 2

  for (let i = 0; i < weeks.length; i++) {
    let rangeStart = getNewDate(weeks[i])
    let rangeEnd = getNewDate(rangeStart)
    rangeEnd.setDate(rangeStart.getDate() + 7)

    if (startDate >= rangeStart && startDate < rangeEnd) return i + 2
  }

  return undefined
}

const getColumnEnd = (allocation, weeks) => {
  const startDate = getNewDate(allocation.startDate)
  const endDate = getNewDate(allocation.endDate)
  if (
    startDate < getNewDate(weeks[weeks.length - 1]) &&
    endDate >= getNewDate(weeks[weeks.length - 1])
  )
    return weeks.length + 2

  for (let i = 0; i < weeks.length; i++) {
    let rangeStart = getNewDate(weeks[i])
    let rangeEnd = getNewDate(rangeStart)
    rangeEnd.setDate(rangeStart.getDate() + 7)
    if (endDate > rangeStart && endDate < rangeEnd) return i + 3
  }

  return undefined
}

export const getPersonById = (id, people) => {
  return people.filter((person) => person.id === id)[0]
}

export const getProjectById = (id, projects) => {
  return projects.filter((project) => project.id === id)[0]
}

const isOverlapping = (allocation, allocations) => {
  for (let i = 0; i < allocations.length; i++) {
    if (
      allocations[i].id !== allocation.id &&
      allocations[i].personId === allocation.personId &&
      getNewDate(allocations[i].startDate) <= getNewDate(allocation.endDate) &&
      getNewDate(allocations[i].endDate) >= getNewDate(allocation.startDate)
    ) {
      return true
    }
  }
  return false
}

export const getAllocationGridCells = ({ allocations, people, projects }) => {
  const gridCells = []
  let projectCells = []

  let p = projects
    .slice()
    .sort((a, b) => b.confidence - a.confidence || a.name.localeCompare(b.name))

  let currentProjectRow = 3

  for (let i = 0; i < p.length; i++) {
    projectCells = []

    const allocationsForProject = getAllocationsForProject(
      allocations,
      p[i],
      people
    )

    // first add the project name cell
    let gridArea =
      currentProjectRow +
      ' / 1 / ' +
      (currentProjectRow + allocationsForProject.length) +
      ' / 2'
    let currentAllocationRow = currentProjectRow
    currentProjectRow += allocationsForProject.length
    projectCells.push(
      <div
        className="project border--right"
        key={p[i].name}
        style={{ gridArea }}
      >
        <Link to={routes.project({ id: p[i].id })}>
          {p[i].name} ({p[i].confidence}%)
        </Link>
      </div>
    )

    const weeks = getWeeks()
    for (let j = 0; j < allocationsForProject.length; j++) {
      const columnStart = getColumnStart(allocationsForProject[j], weeks)
      const columnEnd = getColumnEnd(allocationsForProject[j], weeks)

      gridArea =
        currentAllocationRow +
        ' / ' +
        columnStart +
        ' / ' +
        (currentAllocationRow + 1) +
        ' / ' +
        columnEnd
      currentAllocationRow += 1

      const person = getPersonById(allocationsForProject[j].personId, people)

      projectCells.push(
        <div
          className={`allocation allocation--${person.role} border--right`}
          key={'allocation' + allocationsForProject[j].id}
          style={{ gridArea }}
        >
          {allocationsForProject[j].loan && (
            <span
              className="icon margin--right"
              title="Loan"
              style={{ cursor: 'help' }}
            >
              <i className="fas fa-share-from-square"></i>
            </span>
          )}

          {isOverlapping(allocationsForProject[j], allocations) && (
            <span
              className="icon margin--right"
              title="Already allocated"
              style={{ cursor: 'help' }}
            >
              <i className="fas fa-triangle-exclamation"></i>
            </span>
          )}

          {person.photo && (
            <img
              className="person-image margin--right"
              src={person.photo}
              alt={person.name}
            />
          )}
          <Link to={routes.allocation({ id: allocationsForProject[j].id })}>
            {person.name}
            <small>({allocationsForProject[j].hoursPerWeek} hours)</small>
          </Link>
        </div>
      )
    }

    gridCells.push(
      <div
        key={p[i].id}
        className="grid-row-wrapper border--bottom project-row"
      >
        {projectCells}
      </div>
    )
  }

  return gridCells
}
