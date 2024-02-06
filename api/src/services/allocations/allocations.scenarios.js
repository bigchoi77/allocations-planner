export const standard = defineScenario({
  allocation: {
    one: {
      data: {
        startDate: 'String',
        endDate: 'String',
        hoursPerWeek: 8362609.664667122,
        loan: true,
        person: {
          create: {
            role: 'String',
            name: 'String',
            maxHoursPerWeek: 4727775.244817756,
          },
        },
        project: {
          create: { name: 'String', confidence: 100 },
        },
      },
    },
    two: {
      data: {
        startDate: 'String',
        endDate: 'String',
        hoursPerWeek: 695859.4343106616,
        loan: true,
        person: {
          create: {
            role: 'String',
            name: 'String',
            maxHoursPerWeek: 9290815.990484945,
          },
        },
        project: {
          create: { name: 'String', confidence: 100 },
        },
      },
    },
  },
})
