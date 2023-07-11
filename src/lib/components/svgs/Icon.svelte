<script lang="ts">
   import ArrowRightSvg from '$lib/components/svgs/ArrowRightSvg.svelte'
   import CheckSvg from '$lib/components/svgs/CheckSvg.svelte'
   import ChevronDownSvg from '$lib/components/svgs/ChevronDownSvg.svelte'
   import ChevronUpSvg from '$lib/components/svgs/ChevronUpSvg.svelte'
   import CrossCircleSvg from '$lib/components/svgs/CrossCircleSvg.svelte'
   import EditSvg from '$lib/components/svgs/EditSvg.svelte'
   import EyeClosedSvg from '$lib/components/svgs/EyeClosedSvg.svelte'
   import EyeOpenedSvg from '$lib/components/svgs/EyeOpenedSvg.svelte'
   import HamburgerSvg from '$lib/components/svgs/HamburgerSvg.svelte'
   import HeartFillSvg from '$lib/components/svgs/HeartFillSvg.svelte'
   import HeartSvg from '$lib/components/svgs/HeartSvg.svelte'
   import HomeSvg from '$lib/components/svgs/HomeSvg.svelte'
   import LayoutSvg from '$lib/components/svgs/LayoutSvg.svelte'
   import LogInSvg from '$lib/components/svgs/LogInSvg.svelte'
   import LogOutSvg from '$lib/components/svgs/LogOutSvg.svelte'
   import PlaceholderSvg from '$lib/components/svgs/PlaceholderSvg.svelte'
   import PlusSvg from '$lib/components/svgs/PlusSvg.svelte'
   import SearchSvg from '$lib/components/svgs/SearchSvg.svelte'
   import SignInSvg from '$lib/components/svgs/SignInSvg.svelte'
   import SlashSvg from '$lib/components/svgs/SlashSvg.svelte'
   import StarFilledSvg from '$lib/components/svgs/StarFilledSvg.svelte'
   import StarHalfSvg from '$lib/components/svgs/StarHalfSvg.svelte'
   import StarSvg from '$lib/components/svgs/StarSvg.svelte'
   import TrashSvg from '$lib/components/svgs/TrashSvg.svelte'
   import UserSvg from '$lib/components/svgs/UserSvg.svelte'

   export let name: 'arrow_right' | 'check' | 'chevron_down' | 'chevron_up' | 'cross_circle' | 'edit' | 'eye_closed' | 'eye_opened' | 'hamburger' | 'heart_fill' | 'heart' | 'home' | 'layout' | 'log_in' | 'log_out' | 'placeholder' | 'plus' | 'search' | 'sign_in' | 'slash' | 'star_filled' | 'star_half' | 'star' | 'trash' | 'user';

    const ICONS = {
        arrow_right: ArrowRightSvg,
        check: CheckSvg,
        chevron_down: ChevronDownSvg,
        chevron_up: ChevronUpSvg,
        cross_circle: CrossCircleSvg,
        edit: EditSvg,
        eye_closed: EyeClosedSvg,
        eye_opened: EyeOpenedSvg,
        hamburger: HamburgerSvg,
        heart_fill: HeartFillSvg,
        heart: HeartSvg,
        home: HomeSvg,
        layout: LayoutSvg,
        log_in: LogInSvg,
        log_out: LogOutSvg,
        placeholder: PlaceholderSvg,
        plus: PlusSvg,
        search: SearchSvg,
        sign_in: SignInSvg,
        slash: SlashSvg,
        star_filled: StarFilledSvg,
        star_half: StarHalfSvg,
        star: StarSvg,
        trash: TrashSvg,
        user: UserSvg,
    }

    const Icon = ICONS[name];
</script>

{#if Icon}
    <Icon />
{:else}
    <span>Icon not found</span>
{/if}