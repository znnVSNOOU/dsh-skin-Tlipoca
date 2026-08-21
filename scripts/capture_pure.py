import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    os.makedirs('D:/07_AIbot/dsh/dsh-gal-skin/assets', exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # 精准匹配 1920x1080 纯净窗口比例
        page = await browser.new_page(viewport={'width': 1920, 'height': 1080})
        await page.goto('http://127.0.0.1:10046', timeout=10000)
        await page.wait_for_timeout(3000)
        
        # 1. 切换会话
        session_item = page.locator('text=基于gal-skin文件开展工作').first
        if await session_item.count() > 0:
            await session_item.click()
            await page.wait_for_timeout(2000)
            
        # 2. 点击小死神 tab
        tab = page.locator('text=小死神').first
        if await tab.count() > 0:
            await tab.click()
        else:
            tab_gal = page.locator('text=GAL').first
            if await tab_gal.count() > 0:
                await tab_gal.click()
                
        await page.wait_for_timeout(2500)
        
        # 3. 切换背景为「死神卧室」，表情为「可爱 (cute)」，横条任务打码或模拟纯净思考
        await page.evaluate("""() => {
            // 切换背景为 bg_room
            localStorage.setItem('dsh_gal_bg_key', 'bg_room');
            
            // 找到可爱表情按钮并点击
            const btns = Array.from(document.querySelectorAll('.gal-emo-btn'));
            const cuteBtn = btns.find(b => b.textContent && b.textContent.includes('可爱'));
            if (cuteBtn) cuteBtn.click();
            
            // 找到场景切换里的死神卧室按钮
            const bgBtns = Array.from(document.querySelectorAll('.gal-bg-btn'));
            const roomBtn = bgBtns.find(b => b.textContent && b.textContent.includes('死神卧室'));
            if (roomBtn) roomBtn.click();
        }""")
        
        await page.wait_for_timeout(1500)
        
        # 4. 彻底隐藏/裁剪外部整个 DSH 框架（只保留完全独立纯净的 gal-view 视窗，绝无左侧侧边栏、无个人会话名、无任何外部信息）
        gal_element = page.locator('[data-gal-view]')
        if await gal_element.count() > 0:
            # 对 [data-gal-view] 单独进行无边框全屏截图！
            await gal_element.screenshot(path='D:/07_AIbot/dsh/dsh-gal-skin/assets/preview.png')
            print('Successfully captured pure [data-gal-view] standalone screenshot without any DSH UI!')
        else:
            await page.screenshot(path='D:/07_AIbot/dsh/dsh-gal-skin/assets/preview.png')
            
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
