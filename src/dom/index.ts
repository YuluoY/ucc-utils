/**
 * 向上追溯父节点
 * @param       {Node}                            node            节点
 * @param       {(node: ParentNode) => boolean}   condition       条件
 * @param       {number}                          [max]           最大追溯次数
 * @returns     {ParentNode | null}
 */
export const traceParentNode = (node: ParentNode, condition: (node:Node) => boolean, max: number = 10): ParentNode | null => {
    if (max <= 0 || node.nodeName === '#document') return null;
    if (condition(node)) return node;
    return traceParentNode(node?.parentNode as ParentNode, condition, max - 1);
}