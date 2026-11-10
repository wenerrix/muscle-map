# 全身肌群地圖 Muscle Map

一個單頁網站，用來系統性了解全身肌群和對應的訓練動作，並安排自己的訓練。

## 功能

- **肌群地圖**：點正面、背面全身圖上的 21 個肌群，看放大圖、功能和對應動作。
- **今天練什麼**：選部位和時間，產生照順序做的課表。
- **一週菜單**：每週 3 天（全身）、4 天（上下半身）、5 天（推拉腿＋上下半身）三種排法。
- **特別計畫**：寬肩、塞滿袖口兩個 7 週計畫。
- **飲食教練**：依身高、體重、活動量和目標，算出熱量、蛋白質、碳水、脂肪，並換算成食物份量。
- **動作圖庫**：63 個動作，每個都有中英文名稱、兩格動態示範圖和 YouTube 示範影片。
- **器材選擇**：每個區塊都能切換器材（健身房、只有阻力繩、啞鈴＋阻力繩、只有徒手），課表會自動換成做得到的動作。

## 檔案

- `index.html`：整個網站（HTML、CSS、JavaScript 都在這個檔案裡）。
- `img/`：動作示範圖，每個動作 `-0.jpg`、`-1.jpg` 兩張。

## 部署

這是純靜態網站，不需要 build。

- **GitHub Pages**：repo 的 Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main`、資料夾選 `/ (root)`。
- **Netlify**：Add new site → Import an existing project → 選這個 repo，Build command 留空，Publish directory 填 `.`。

## 來源與授權

- 示範照片：[Free Exercise DB](https://github.com/yuhonas/free-exercise-db)（Unlicense，公眾領域）。
- 6 個資料庫沒有照片的動作（阻力繩胸推、划船、下拉、彎舉、單手提物走、脛前肌抬起）使用自繪示意圖。
- YouTube 影片屬於各影片作者，網站只透過 YouTube 官方播放器嵌入。
- 飲食數字以 Mifflin-St Jeor 公式估算，只是起點，不能取代醫師或營養師的建議。
