<script lang="ts">
  import QrCode from "./lib/QrCode.svelte";
  import { v4 as uuid4 } from "uuid";

  type Unit = "in" | "mm" | "cm";

  const unit: Unit = "in";

  const pageWidth = 8.5;
  const pageHeight = 11;
  const pageMargin = 0.25;
  const qrSize = 1;

  const split = false;

  const colCount = ((pageWidth - pageMargin * 2) / qrSize) | 0;
  let rowCount = ((pageHeight - pageMargin * 2) / qrSize) | 0;
  rowCount -= rowCount % 2 === 1 && split ? 1 : 0;

  const iter = Array.from(Array(colCount * rowCount).keys());
</script>

<div
  id="grid"
  style:--page-width={`${pageWidth}${unit}`}
  style:--page-height={`${pageHeight}${unit}`}
  style:--page-margin={`${pageMargin}${unit}`}
  style:--qr-size={`${qrSize}${unit}`}
  style:--col-count={colCount}
  style:--row-count={rowCount}
>
  {#each iter as _}
    <div class="item">
      <QrCode input={uuid4()} />
    </div>
  {/each}
</div>

<style>
  :global(body) {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #grid {
    display: grid;
    grid-template-columns: repeat(var(--col-count), 1fr);
    grid-template-rows: repeat(var(--row-count), 1fr);
    gap: 0;
    padding: var(--page-margin);
  }

  .item {
    width: var(--qr-size);
    height: var(--qr-size);

    box-sizing: border-box;
    border: 1px dashed;
  }
</style>
