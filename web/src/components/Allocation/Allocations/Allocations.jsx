import { useEffect, useRef, useState } from 'react'

import {
  getCurrentBeach,
  getMonthGridCells,
  getAllocationGridCells,
  getWeekGridCells,
} from 'src/lib/functions'

const AllocationsList = ({ allocations, people, projects }) => {
  const beachPeople = getCurrentBeach(allocations, people)
  const pms = beachPeople.filter((person) => person.role === 'pm')
  const designers = beachPeople.filter((person) => person.role === 'designer')
  const engineers = beachPeople.filter((person) => person.role === 'engineer')
  const dls = beachPeople.filter((person) => person.role === 'delivery-lead')

  const grid = useRef()

  return (
    <>
      <div className="beach box margin--bottom">
        <h2 className="title is-5 mb-2">On Beach Currently:</h2>
        <div className="is-flex">
          <div className="is-flex-grow-1">
            <h3 className="title is-6 mb-1">PMs</h3>
            <ul className="list">
              {pms.map((pm) => (
                <li key={pm.id} className="person--pm">
                  {pm.photo && (
                    <img
                      className="person-image margin--right"
                      src={pm.photo}
                      alt={pm.name}
                    />
                  )}

                  {pm.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="is-flex-grow-1">
            <h3 className="title is-6 mb-1">Designers</h3>
            <ul className="list">
              {designers.map((designer) => (
                <li key={designer.id} className="person--designer">
                  {designer.photo && (
                    <img
                      className="person-image margin--right"
                      src={designer.photo}
                      alt={designer.name}
                    />
                  )}

                  {designer.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="is-flex-grow-1">
            <h3 className="title is-6 mb-1">Engineers</h3>
            <ul className="list">
              {engineers.map((engineer) => (
                <li key={engineer.id} className="person--engineer">
                  {engineer.photo && (
                    <img
                      className="person-image margin--right"
                      src={engineer.photo}
                      alt={engineer.name}
                    />
                  )}

                  {engineer.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="is-flex-grow-1">
            <h3 className="title is-6 mb-1">DLs</h3>
            <ul className="list">
              {dls.map((dl) => (
                <li key={dl.id} className="person--delivery-lead">
                  {dl.photo && (
                    <img
                      className="person-image margin--right"
                      src={dl.photo}
                      alt={dl.name}
                    />
                  )}

                  {dl.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="allocations-grid" ref={grid}>
        <div className="grid-row-wrapper border--bottom">
          <div
            className="border--right"
            style={{ gridArea: '1 / 1 / 2 / 2' }}
          ></div>
          {getMonthGridCells({
            allocations,
            people,
            projects,
          })}
        </div>

        <div className="grid-row-wrapper border--bottom">
          <div
            className="border--bottom border--right week"
            style={{ gridArea: '2 / 1 / 3 / 2' }}
          >
            Week Start
          </div>
          {getWeekGridCells({
            allocations,
            people,
            projects,
          })}
        </div>

        {getAllocationGridCells({ allocations, people, projects })}
      </div>
    </>
  )
}

export default AllocationsList
