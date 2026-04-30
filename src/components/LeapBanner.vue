<script lang="ts" setup>
const repoZip =
  'https://github.com/allen2dev/blog/archive/refs/heads/main.zip'
const repoTar =
  'https://github.com/allen2dev/blog/archive/refs/heads/main.tar.gz'
const repoUrl = 'https://github.com/allen2dev/blog'
</script>

<template>
  <div id="banner" class="banner-strip">
    <div class="banner-strip__inner">
      <span id="logo" class="banner-strip__octo" aria-hidden="true" />
      <a :href="repoUrl" class="button fork" target="_blank" rel="noopener noreferrer">
        <strong>在 GitHub 上查看</strong>
      </a>
      <div class="downloads">
        <span>下载：</span>
        <ul>
          <li>
            <a :href="repoZip" class="button">ZIP</a>
          </li>
          <li>
            <a :href="repoTar" class="button">TAR</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner-strip {
  z-index: 100;
  position: fixed;
  top: 115px;
  left: 0;
  right: 0;
  height: 50px;
  background: #ffcc00;
  border-bottom: 1px solid #f0b500;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
}

.banner-strip__inner {
  position: relative;
  max-width: 650px;
  margin: 0 auto;
  padding: 0 12px;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
}

.banner-strip .button {
  border: 1px solid #dba500;
  background: linear-gradient(#ffe788, #ffce38);
  border-radius: 2px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.4),
    0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: #ffe788;
  padding: 10px 12px;
  line-height: 14px;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
}

.banner-strip .button:hover {
  background: #ffeca0;
}

.banner-strip .fork {
  flex: 0 0 auto;
}

.downloads {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0;
}

.downloads span {
  line-height: 1;
  font-size: 12px;
  color: #9d7f0d;
  text-transform: uppercase;
  text-shadow: rgba(255, 255, 255, 0.2) 0 1px 0;
  margin-right: 4px;
}

.downloads ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 4px;
  align-items: center;
}

.downloads li {
  display: inline-block;
}

.banner-strip__octo {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  height: 36px;
  width: 36px;
  display: block;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23333'%3E%3Cpath d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z'/%3E%3C/svg%3E")
    center / contain no-repeat;
}

@media print, screen and (max-width: 720px) {
  .banner-strip {
    top: 80px;
  }

  .banner-strip__inner {
    padding-right: 48px;
  }
}

@media print, screen and (max-width: 480px) {
  .banner-strip {
    display: none;
  }

  .banner-strip__inner {
    padding-right: 12px;
  }
}
</style>
