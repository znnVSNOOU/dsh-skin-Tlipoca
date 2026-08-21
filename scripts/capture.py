import asyncio
from playwright.async_api import async_playwright
import os

async def main():
    os.makedirs('D:/07_AIbot/dsh/dsh-gal-skin/assets', exist_ok=True)
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1440, 'height': 860})
        await page.goto('http://127.0.0.1:10046', timeout=10000)
        await page.wait_for_timeout(3000)
        
        # 1. 点击左侧会话列表中的「基于gal-skin文件开展工作」
        session_item = page.locator('text=基于gal-skin文件开展工作').first
        if await session_item.count() > 0:
            await session_item.click()
            print('Clicked session: 基于gal-skin文件开展工作')
            await page.wait_for_timeout(3000)
            
        # 2. 点击顶部的「小死神」或「GAL」视图标签
        tab = page.locator('text=小死神').first
        if await tab.count() > 0:
            await tab.click()
            print('Clicked tab: 小死神')
        else:
            tab_gal = page.locator('text=GAL').first
            if await tab_gal.count() > 0:
                await tab_gal.click()
                print('Clicked tab: GAL')
                
        # 3. 等待 GAL 视窗就绪
        await page.wait_for_timeout(3500)
        
        # 4. 隐藏右下角的跑分弹窗或小广告（以便获得最完美的纯净截图）
        await page.evaluate("""() => {
            document.querySelectorAll('div').forEach(el => {
                if (el.textContent && (el.textContent.includes('跑分中心') || el.textContent.includes('中转站') || el.textContent.includes('广告'))) {
                    el.style.display = 'none';
                }
            });
        }""")
        
        # 截图保存为 assets/preview.png
        await page.screenshot(path='D:/07_AIbot/dsh/dsh-gal-skin/assets/preview.png')
        print('Successfully captured clean Little Reaper preview screenshot!')
        await browser.close()

if __name__ == '__main__':
    asyncio.run(main())
