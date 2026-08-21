// dsh-gal-skin Node half：极简。全部逻辑运行在浏览器 half——
// 素材内嵌于 client bundle，无宿主行为。
// 契约：官方 bundle 插件（package.json 的 dsh.bundle + dsh.client；
// client 产物 .dsh-plugin/client.js 由 scripts/build-client.mjs 生成）。
export const name = 'dsh-gal-skin'

export const inject = []

export function apply() {
  // 无宿主侧行为：client half 自行注册视图。
}
