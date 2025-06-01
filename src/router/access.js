/**
 * 获取树形结构中所有叶子节点的路径
 * @param tree 树形结构数据
 * @param fieldName 需要提取的字段名称
 * @param childrenKey 子节点的键名，默认为 'children'
 * @param parentPath 父节点路径，用于递归
 * @returns 所有叶子节点路径的数组
 */
export function getAllPermissions(tree, fieldName, childrenKey, parentPath) {
  let paths = []

  for (const node of tree) {
    // 当前节点的值
    const currentValue = String(node[fieldName] || '')
    // 当前路径
    const currentPath = currentValue != '' ? [...parentPath, currentValue] : parentPath

    // 判断是否有子节点
    const hasChildren =
      node[childrenKey] && Array.isArray(node[childrenKey]) && node[childrenKey].length > 0

    if (!hasChildren) {
      // 如果是叶子节点（没有子节点），才添加到结果中
      paths.push(currentPath.join('.'))
    } else {
      // 如果有子节点，递归处理
      const childPaths = getAllPermissions(node[childrenKey], fieldName, childrenKey, currentPath)
      paths = [...paths, ...childPaths]
    }
  }

  return paths
}

/**
 * 根据指定的路径数组过滤树形结构
 * @param tree 原始树形结构数据
 * @param allowedPaths 允许的路径数组，格式为字符串数组的数组
 * @param fieldName 用于构建路径的字段名
 * @param childrenKey 子节点的键名，默认为 'children'
 * @param parentPath 父节点路径，用于递归
 * @returns 过滤后的树形结构
 */
export function filterTreeByPaths(tree, allowedPaths, fieldName, childrenKey, parentPath) {
  return tree
    .map(node => {
      // 当前节点的值
      const currentValue = String(node[fieldName] || '')
      // 当前路径
      const currentPath = currentValue !== '' ? [...parentPath, currentValue] : parentPath

      // 判断是否有子节点
      const hasChildren =
        node[childrenKey] && Array.isArray(node[childrenKey]) && node[childrenKey].length > 0

      if (!hasChildren) {
        // 如果是叶子节点，检查路径是否在允许的路径数组中
        const pathExists = allowedPaths.some(
          path =>
            path.length === currentPath.length &&
            path.every((value, index) => value === currentPath[index])
        )

        // 如果路径存在，保留节点；否则返回null表示要删除
        return pathExists ? { ...node } : null
      } else {
        // 递归处理子节点
        const filteredChildren = filterTreeByPaths(
          node[childrenKey],
          allowedPaths,
          fieldName,
          childrenKey,
          currentPath
        )

        // 如果过滤后没有子节点了，返回null表示要删除
        if (filteredChildren.length === 0) {
          return null
        }

        // 返回包含过滤后子节点的节点副本
        return {
          ...node,
          [childrenKey]: filteredChildren
        }
      }
    })
    .filter(Boolean) // 过滤掉null值并恢复类型
}

/**
 *
 * @param tree
 * @param path
 * @param options
 * @returns
 */
export function findNodeByPath(tree, path, fieldName, childrenKey) {
  // 验证输入
  if (!Array.isArray(tree) || !Array.isArray(path)) {
    return null
  }

  // 如果路径为空数组，返回null（因为树形数组没有单一根节点）
  if (path.length === 0) {
    return null
  }

  // 查找第一个路径段对应的根节点
  const rootNode = tree.find(node => node[fieldName] === path[0])
  if (!rootNode) {
    return null
  }

  // 如果路径只有一段，直接返回根节点
  if (path.length === 1) {
    return rootNode
  }

  let currentNode = rootNode

  // 从第二段路径开始遍历
  for (let i = 1; i < path.length; i++) {
    const pathSegment = path[i]

    // 检查当前节点是否有子节点
    console.log('currentNode[childrenKey]', currentNode, childrenKey, fieldName)
    if (!currentNode[childrenKey] || !Array.isArray(currentNode[childrenKey])) {
      // 非严格模式下，返回当前能找到的最深节点
      return currentNode
    }

    // 查找下一个节点
    const nextNode = currentNode[childrenKey].find(child => child[fieldName] === pathSegment)

    // 移动到下一个节点
    currentNode = nextNode
  }

  // 返回找到的节点
  return currentNode
}

function generateRoutes(options) {
  const { routes } = options
  debugger
  const accessStore = useAccessStore()
  // 权限中的所有aliasName
  const permissions = getAllPermissions(accessStore.accessMenus, 'aliasName')
  accessStore.setPermissions(permissions)
  // 过滤有权限的路由
  const accessRoutes = routes.filter(route => {
    return (
      Array.isArray(route.meta?.permissions) &&
      route.meta.permissions.every(item => permissions.includes(item))
    )
  })
  console.log('paths:', accessRoutes)
  return accessRoutes
}

function generateMenu(options) {
  const { router, routes } = options
  const accessStore = useAccessStore()

  function resloveMenuUrl(tree, fieldName, childrenKey, parentPath) {
    return tree
      .map(node => {
        // 当前节点的值
        const currentValue = String(node[fieldName] || '')
        // 当前路径
        const currentPath = currentValue !== '' ? [...parentPath, currentValue] : parentPath

        // 判断是否有子节点
        const hasChildren =
          node[childrenKey] && Array.isArray(node[childrenKey]) && node[childrenKey].length > 0

        if (!hasChildren) {
          const resultRoute = routes.find(route => {
            return (
              Array.isArray(route.meta?.permissions) &&
              route.meta.permissions.every(item => item === currentPath.join('.'))
            )
          })

          if (resultRoute) {
            node['path'] = resultRoute.path
          } else {
            node['path'] = '/404'
          }
          return {
            ...node
          }
        } else {
          // 递归处理子节点
          const filteredChildren = resloveMenuUrl(
            node[childrenKey],
            fieldName,
            childrenKey,
            currentPath
          )

          // 如果过滤后没有子节点了，返回null表示要删除
          if (filteredChildren.length === 0) {
            return null
          }

          // 返回包含过滤后子节点的节点副本
          return {
            ...node,
            [childrenKey]: filteredChildren
          }
        }
      })
      .filter(Boolean) // 过滤掉null值并恢复类型
  }

  return resloveMenuUrl(accessStore.accessMenus, 'aliasName')
}

async function generateAccess(options) {
  const { router, routes } = options

  debugger
  // 生成路由
  const accessibleRoutes = await generateRoutes(options)

  accessibleRoutes.forEach(route => {
    router.addRoute(route)
  })

  router.addRoute(fallbackNotFoundRoute)

  // 生成菜单
  const accessibleMenus = await generateMenu(options)

  return {
    accessibleRoutes,
    accessibleMenus
  }
}

export { generateAccess }
