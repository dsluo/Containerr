<script lang="ts">
  import QRCode from 'qrcode';

  export let input;
</script>

{#await QRCode.toString(input, { type: "svg" })}
  loading...
{:then qrcode}
  {@html qrcode}
{/await}
