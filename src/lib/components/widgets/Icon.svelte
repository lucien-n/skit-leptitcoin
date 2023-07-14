<script lang="ts">
	import ArrowRightSvg from '$comp/svgs/ArrowRightSvg.svelte';
	import CheckSvg from '$comp/svgs/CheckSvg.svelte';
	import ChevronDownSvg from '$comp/svgs/ChevronDownSvg.svelte';
	import ChevronUpSvg from '$comp/svgs/ChevronUpSvg.svelte';
	import CrossCircleSvg from '$comp/svgs/CrossCircleSvg.svelte';
	import EditSvg from '$comp/svgs/EditSvg.svelte';
	import EyeClosedSvg from '$comp/svgs/EyeClosedSvg.svelte';
	import EyeOpenedSvg from '$comp/svgs/EyeOpenedSvg.svelte';
	import HamburgerSvg from '$comp/svgs/HamburgerSvg.svelte';
	import HeartFillSvg from '$comp/svgs/HeartFillSvg.svelte';
	import HeartSvg from '$comp/svgs/HeartSvg.svelte';
	import HomeSvg from '$comp/svgs/HomeSvg.svelte';
	import LayoutSvg from '$comp/svgs/LayoutSvg.svelte';
	import LogInSvg from '$comp/svgs/LogInSvg.svelte';
	import LogOutSvg from '$comp/svgs/LogOutSvg.svelte';
	import PlaceholderSvg from '$comp/svgs/PlaceholderSvg.svelte';
	import PlusSvg from '$comp/svgs/PlusSvg.svelte';
	import SearchSvg from '$comp/svgs/SearchSvg.svelte';
	import SignInSvg from '$comp/svgs/SignInSvg.svelte';
	import SlashSvg from '$comp/svgs/SlashSvg.svelte';
	import StarFilledSvg from '$comp/svgs/StarFilledSvg.svelte';
	import StarHalfSvg from '$comp/svgs/StarHalfSvg.svelte';
	import StarSvg from '$comp/svgs/StarSvg.svelte';
	import TrashSvg from '$comp/svgs/TrashSvg.svelte';
	import UserSvg from '$comp/svgs/UserSvg.svelte';

	export let name:
		| 'arrow_right'
		| 'check'
		| 'chevron_down'
		| 'chevron_up'
		| 'cross_circle'
		| 'edit'
		| 'eye_closed'
		| 'eye_opened'
		| 'hamburger'
		| 'heart_fill'
		| 'heart'
		| 'home'
		| 'layout'
		| 'log_in'
		| 'log_out'
		| 'placeholder'
		| 'plus'
		| 'search'
		| 'sign_in'
		| 'slash'
		| 'star_filled'
		| 'star_half'
		| 'star'
		| 'trash'
		| 'user';

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
		user: UserSvg
	};

	const Icon = ICONS[name];
</script>

{#if Icon}
	<Icon />
{:else}
	<span>Icon not found</span>
{/if}
