'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const core_1 = require('../../core')
describe('This is a test for convertRoutesToLevel function', () => {
  const units = [
    {
      name: 'base test 1',
      test: [
        { id: 1, name: 'home', path: '/' },
        { id: 2, name: 'about', path: '/about' },
        { id: 3, name: 'blog', path: '/blog' },
        { id: 4, name: 'blog-detail', path: '/blog/:id', parentId: 3 },
        {
          id: 5,
          name: 'blog-detail',
          path: '/blog/:id/:slug',
          parentId: 4
        },
        { id: 6, name: 'about-us', path: '/about-us', parentId: 2 }
      ],
      assets: [
        { id: 1, name: 'home', path: '/' },
        {
          id: 2,
          name: 'about',
          path: '/about',
          children: [
            {
              id: 6,
              name: 'about-us',
              path: '/about-us',
              parentId: 2
            }
          ]
        },
        {
          id: 3,
          name: 'blog',
          path: '/blog',
          children: [
            {
              id: 4,
              name: 'blog-detail',
              path: '/blog/:id',
              parentId: 3,
              children: [
                {
                  id: 5,
                  name: 'blog-detail',
                  path: '/blog/:id/:slug',
                  parentId: 4
                }
              ]
            }
          ]
        }
      ]
    }
  ]
  units.forEach((unit) => {
    it(unit.name, () => {
      const result = (0, core_1.convertRoutesToLevel)(unit.test)
      expect(result).toEqual(unit.assets)
    })
  })
})
