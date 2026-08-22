/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js"

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} AdminInputs */
/** @typedef {{}} Admin_Assets_DescriptionInputs */
/** @typedef {{}} Admin_Assets_CopiedInputs */
/** @typedef {{}} Admin_Assets_Copy_MarkdownInputs */
/** @typedef {{}} Admin_Assets_Copy_UrlInputs */
/** @typedef {{}} Admin_Assets_DeleteInputs */
/** @typedef {{}} Admin_Assets_Drop_HintInputs */
/** @typedef {{}} Admin_Assets_EmptyInputs */
/** @typedef {{}} Admin_Assets_ErrorInputs */
/** @typedef {{}} Admin_Assets_FilenameInputs */
/** @typedef {{}} Admin_Assets_Markdown_CopiedInputs */
/** @typedef {{}} Admin_Assets_No_MatchesInputs */
/** @typedef {{}} Admin_Assets_SearchInputs */
/** @typedef {{}} Admin_Assets_Search_PlaceholderInputs */
/** @typedef {{}} Admin_Assets_TitleInputs */
/** @typedef {{}} Admin_Assets_UploadedInputs */
/** @typedef {{}} Admin_Assets_UploadingInputs */
/** @typedef {{}} Admin_Assets_UrlInputs */
/** @typedef {{}} Admin_Comments_ApproveInputs */
/** @typedef {{}} Admin_Comments_All_PostsInputs */
/** @typedef {{}} Admin_Comments_Auto_BlockInputs */
/** @typedef {{}} Admin_Comments_Batch_ApproveInputs */
/** @typedef {{}} Admin_Comments_Batch_DeleteInputs */
/** @typedef {{}} Admin_Comments_Batch_SpamInputs */
/** @typedef {{}} Admin_Comments_Blocked_KeywordsInputs */
/** @typedef {{}} Admin_Comments_Blocked_Keywords_HelpInputs */
/** @typedef {{}} Admin_Comments_DeleteInputs */
/** @typedef {{}} Admin_Comments_DescriptionInputs */
/** @typedef {{}} Admin_Comments_EmptyInputs */
/** @typedef {{}} Admin_Comments_Filter_PostInputs */
/** @typedef {{}} Admin_Comments_Mark_SpamInputs */
/** @typedef {{ count: NonNullable<unknown> }} Admin_Comments_Pending_CountInputs */
/** @typedef {{}} Admin_Comments_Require_ApprovalInputs */
/** @typedef {{}} Admin_Comments_SearchInputs */
/** @typedef {{}} Admin_Comments_Search_PlaceholderInputs */
/** @typedef {{}} Admin_Comments_Select_AllInputs */
/** @typedef {{ author: NonNullable<unknown> }} Admin_Comments_Select_OneInputs */
/** @typedef {{ count: NonNullable<unknown> }} Admin_Comments_SelectedInputs */
/** @typedef {{}} Admin_Comments_Status_AllInputs */
/** @typedef {{}} Admin_Comments_Status_ApprovedInputs */
/** @typedef {{}} Admin_Comments_Status_DeletedInputs */
/** @typedef {{}} Admin_Comments_Status_PendingInputs */
/** @typedef {{}} Admin_Comments_Status_SpamInputs */
/** @typedef {{}} Admin_Comments_TitleInputs */
/** @typedef {{}} Admin_Comments_View_PostInputs */
/** @typedef {{}} Admin_Comment_SettingsInputs */
/** @typedef {{}} Admin_Editor_Default_ExcerptInputs */
/** @typedef {{}} Admin_Editor_Default_TitleInputs */
/** @typedef {{}} Admin_Editor_Comments_EnabledInputs */
/** @typedef {{}} Admin_Editor_DescriptionInputs */
/** @typedef {{}} Admin_Editor_Edit_TitleInputs */
/** @typedef {{}} Admin_Editor_ErrorInputs */
/** @typedef {{}} Admin_Editor_ExcerptInputs */
/** @typedef {{}} Admin_Editor_Cover_AssetInputs */
/** @typedef {{}} Admin_Editor_Cover_Asset_PlaceholderInputs */
/** @typedef {{}} Admin_Editor_Cover_ImageInputs */
/** @typedef {{}} Admin_Editor_FeaturedInputs */
/** @typedef {{}} Admin_Editor_PinnedInputs */
/** @typedef {{}} Admin_Editor_Preview_ModeInputs */
/** @typedef {{}} Admin_Editor_Publish_AtInputs */
/** @typedef {{}} Admin_Editor_Rich_ModeInputs */
/** @typedef {{}} Admin_Editor_SavedInputs */
/** @typedef {{}} Admin_Editor_Seo_DescriptionInputs */
/** @typedef {{}} Admin_Editor_Seo_TitleInputs */
/** @typedef {{}} Admin_Editor_SeriesInputs */
/** @typedef {{}} Admin_Editor_Series_NoneInputs */
/** @typedef {{}} Admin_Editor_Source_ModeInputs */
/** @typedef {{}} Admin_Editor_TagsInputs */
/** @typedef {{}} Admin_Editor_TitleInputs */
/** @typedef {{}} Admin_Latest_PostInputs */
/** @typedef {{}} Admin_Manage_PostsInputs */
/** @typedef {{ name: NonNullable<unknown> }} Admin_Metric_Overview_DescriptionInputs */
/** @typedef {{}} Admin_Moderation_QueueInputs */
/** @typedef {{ count: NonNullable<unknown> }} Admin_Moderation_Queue_DetailInputs */
/** @typedef {{}} Admin_Nav_AssetsInputs */
/** @typedef {{}} Admin_Nav_CommentsInputs */
/** @typedef {{}} Admin_Nav_OverviewInputs */
/** @typedef {{}} Admin_Nav_PostsInputs */
/** @typedef {{}} Admin_Nav_SeriesInputs */
/** @typedef {{}} Admin_Nav_SettingsInputs */
/** @typedef {{}} Admin_Nav_UsersInputs */
/** @typedef {{}} Admin_New_PostInputs */
/** @typedef {{}} Admin_Overview_EyebrowInputs */
/** @typedef {{}} Admin_Overview_TitleInputs */
/** @typedef {{}} Admin_Post_Status_Archived_DescriptionInputs */
/** @typedef {{}} Admin_Post_Status_Archived_LabelInputs */
/** @typedef {{}} Admin_Post_Status_Deleted_DescriptionInputs */
/** @typedef {{}} Admin_Post_Status_Deleted_LabelInputs */
/** @typedef {{}} Admin_Post_Status_Draft_DescriptionInputs */
/** @typedef {{}} Admin_Post_Status_Draft_LabelInputs */
/** @typedef {{}} Admin_Post_Status_Published_DescriptionInputs */
/** @typedef {{}} Admin_Post_Status_Published_LabelInputs */
/** @typedef {{}} Admin_Post_Status_Scheduled_DescriptionInputs */
/** @typedef {{}} Admin_Post_Status_Scheduled_LabelInputs */
/** @typedef {{}} Admin_Posts_ActionsInputs */
/** @typedef {{}} Admin_Posts_ArchiveInputs */
/** @typedef {{}} Admin_Posts_Column_TitleInputs */
/** @typedef {{}} Admin_Posts_DeleteInputs */
/** @typedef {{}} Admin_Posts_DescriptionInputs */
/** @typedef {{}} Admin_Posts_EditInputs */
/** @typedef {{}} Admin_Posts_Filter_All_StatusInputs */
/** @typedef {{}} Admin_Posts_Filter_All_SeriesInputs */
/** @typedef {{}} Admin_Posts_Filter_All_TagsInputs */
/** @typedef {{}} Admin_Posts_Filter_SeriesInputs */
/** @typedef {{}} Admin_Posts_Filter_StatusInputs */
/** @typedef {{}} Admin_Posts_Filter_TagInputs */
/** @typedef {{}} Admin_Posts_Move_To_DraftInputs */
/** @typedef {{}} Admin_Posts_No_SeriesInputs */
/** @typedef {{}} Admin_Posts_Not_PublicInputs */
/** @typedef {{}} Admin_Posts_Public_UrlInputs */
/** @typedef {{}} Admin_Posts_SearchInputs */
/** @typedef {{}} Admin_Posts_Select_AllInputs */
/** @typedef {{ title: NonNullable<unknown> }} Admin_Posts_Select_OneInputs */
/** @typedef {{ count: NonNullable<unknown> }} Admin_Posts_SelectedInputs */
/** @typedef {{}} Admin_Posts_SourceInputs */
/** @typedef {{}} Admin_Posts_StatusInputs */
/** @typedef {{}} Admin_Posts_Status_HelpInputs */
/** @typedef {{}} Admin_Posts_TitleInputs */
/** @typedef {{}} Admin_Posts_UpdatedInputs */
/** @typedef {{}} Admin_Posts_ViewInputs */
/** @typedef {{}} Admin_Publish_PostInputs */
/** @typedef {{}} Admin_Save_DraftInputs */
/** @typedef {{}} Admin_Schedule_PostInputs */
/** @typedef {{}} Admin_Save_SettingsInputs */
/** @typedef {{}} Admin_Series_CancelInputs */
/** @typedef {{}} Admin_Series_DescriptionInputs */
/** @typedef {{}} Admin_Series_ErrorInputs */
/** @typedef {{}} Admin_Series_NameInputs */
/** @typedef {{}} Admin_Series_NewInputs */
/** @typedef {{}} Admin_Series_SaveInputs */
/** @typedef {{}} Admin_Series_SavedInputs */
/** @typedef {{}} Admin_Series_SlugInputs */
/** @typedef {{}} Admin_Series_Sort_OrderInputs */
/** @typedef {{}} Admin_Series_SummaryInputs */
/** @typedef {{}} Admin_Series_TitleInputs */
/** @typedef {{}} Admin_Import_Export_TitleInputs */
/** @typedef {{}} Admin_Import_Export_DescriptionInputs */
/** @typedef {{}} Admin_Export_TitleInputs */
/** @typedef {{}} Admin_Export_JsonInputs */
/** @typedef {{}} Admin_Export_ZipInputs */
/** @typedef {{}} Admin_Export_StartedInputs */
/** @typedef {{}} Admin_Export_ErrorInputs */
/** @typedef {{}} Admin_Create_BackupInputs */
/** @typedef {{}} Admin_Backup_CreatedInputs */
/** @typedef {{}} Admin_Backup_ErrorInputs */
/** @typedef {{}} Admin_Import_TitleInputs */
/** @typedef {{}} Admin_Import_FileInputs */
/** @typedef {{}} Admin_Import_StatusInputs */
/** @typedef {{}} Admin_Import_SubmitInputs */
/** @typedef {{ title: NonNullable<unknown> }} Admin_Import_SuccessInputs */
/** @typedef {{}} Admin_Import_ErrorInputs */
/** @typedef {{}} Admin_Email_SettingsInputs */
/** @typedef {{}} Admin_Email_VerificationInputs */
/** @typedef {{}} Admin_Email_Verification_HelpInputs */
/** @typedef {{ provider: NonNullable<unknown> }} Admin_Email_Verification_ProviderInputs */
/** @typedef {{}} Admin_Email_Verification_UnavailableInputs */
/** @typedef {{}} Admin_Settings_Author_BioInputs */
/** @typedef {{}} Admin_Settings_Author_NameInputs */
/** @typedef {{}} Admin_Settings_Avatar_UrlInputs */
/** @typedef {{}} Admin_Settings_Default_OgInputs */
/** @typedef {{}} Admin_Settings_DescriptionInputs */
/** @typedef {{}} Admin_Settings_ErrorInputs */
/** @typedef {{}} Admin_Settings_HelpInputs */
/** @typedef {{}} Admin_Settings_IdentityInputs */
/** @typedef {{}} Admin_Settings_IndexingInputs */
/** @typedef {{}} Admin_Settings_LanguageInputs */
/** @typedef {{}} Admin_Settings_Layout_PresetInputs */
/** @typedef {{}} Admin_Settings_LinksInputs */
/** @typedef {{}} Admin_Settings_Navigation_LinksInputs */
/** @typedef {{}} Admin_Settings_RssInputs */
/** @typedef {{}} Admin_Settings_SavedInputs */
/** @typedef {{}} Admin_Settings_Site_NameInputs */
/** @typedef {{}} Admin_Settings_Site_UrlInputs */
/** @typedef {{}} Admin_Settings_Social_LinksInputs */
/** @typedef {{}} Admin_Settings_Theme_PresetInputs */
/** @typedef {{}} Admin_Settings_TitleInputs */
/** @typedef {{}} Admin_Storage_ContractInputs */
/** @typedef {{}} Admin_Storage_Contract_DetailInputs */
/** @typedef {{}} Admin_Create_TokenInputs */
/** @typedef {{}} Admin_Revoke_TokenInputs */
/** @typedef {{}} Admin_Token_NameInputs */
/** @typedef {{}} Admin_Token_RevokedInputs */
/** @typedef {{}} Admin_Token_ScopesInputs */
/** @typedef {{}} Admin_Token_Secret_OnceInputs */
/** @typedef {{}} Admin_Tokens_DescriptionInputs */
/** @typedef {{}} Admin_Tokens_TitleInputs */
/** @typedef {{}} Admin_Users_CommentsInputs */
/** @typedef {{ count: NonNullable<unknown> }} Admin_Users_Comments_CountInputs */
/** @typedef {{}} Admin_Users_DescriptionInputs */
/** @typedef {{}} Admin_Users_Email_UnverifiedInputs */
/** @typedef {{}} Admin_Users_Email_VerifiedInputs */
/** @typedef {{}} Admin_Users_EmptyInputs */
/** @typedef {{}} Admin_Users_ErrorInputs */
/** @typedef {{}} Admin_Users_Filter_RoleInputs */
/** @typedef {{}} Admin_Users_Filter_StatusInputs */
/** @typedef {{ date: NonNullable<unknown> }} Admin_Users_JoinedInputs */
/** @typedef {{}} Admin_Users_Last_CommentInputs */
/** @typedef {{}} Admin_Users_MuteInputs */
/** @typedef {{}} Admin_Users_No_CommentsInputs */
/** @typedef {{}} Admin_Users_Provider_EmailInputs */
/** @typedef {{}} Admin_Users_Provider_UnknownInputs */
/** @typedef {{}} Admin_Users_Role_AdminInputs */
/** @typedef {{}} Admin_Users_Role_AllInputs */
/** @typedef {{}} Admin_Users_Role_ReaderInputs */
/** @typedef {{}} Admin_Users_SavedInputs */
/** @typedef {{}} Admin_Users_SearchInputs */
/** @typedef {{}} Admin_Users_Search_PlaceholderInputs */
/** @typedef {{}} Admin_Users_Status_ActiveInputs */
/** @typedef {{}} Admin_Users_Status_AllInputs */
/** @typedef {{}} Admin_Users_Status_MutedInputs */
/** @typedef {{}} Admin_Users_Status_Not_ChangedInputs */
/** @typedef {{}} Admin_Users_Status_UpdatedInputs */
/** @typedef {{}} Admin_Users_TitleInputs */
/** @typedef {{}} Admin_Users_TotalInputs */
/** @typedef {{}} Admin_Users_UnmuteInputs */
/** @typedef {{}} Account_Management_NoteInputs */
/** @typedef {{}} Account_Signed_In_AsInputs */
/** @typedef {{}} Account_TitleInputs */
/** @typedef {{}} Api_DescriptionInputs */
/** @typedef {{}} Api_EyebrowInputs */
/** @typedef {{}} Api_Manage_SettingsInputs */
/** @typedef {{}} Api_MethodInputs */
/** @typedef {{}} Api_Open_OpenapiInputs */
/** @typedef {{}} Api_PathInputs */
/** @typedef {{}} Api_ScopeInputs */
/** @typedef {{}} Api_TitleInputs */
/** @typedef {{}} Api_Token_ScopesInputs */
/** @typedef {{}} Back_HomeInputs */
/** @typedef {{}} Blog_DescriptionInputs */
/** @typedef {{}} Blog_EyebrowInputs */
/** @typedef {{}} Blog_Filter_AllInputs */
/** @typedef {{}} Blog_Filter_LabelInputs */
/** @typedef {{}} Blog_No_ResultsInputs */
/** @typedef {{}} Blog_Search_PlaceholderInputs */
/** @typedef {{}} Blog_Search_SubmitInputs */
/** @typedef {{}} Blog_Series_AllInputs */
/** @typedef {{}} Blog_Series_Filter_LabelInputs */
/** @typedef {{}} Blog_TitleInputs */
/** @typedef {{}} Comment_BodyInputs */
/** @typedef {{}} Comment_CompanyInputs */
/** @typedef {{}} Comment_Auth_ErrorInputs */
/** @typedef {{}} Comment_Auth_LoadingInputs */
/** @typedef {{}} Comment_Account_MutedInputs */
/** @typedef {{}} Comment_Account_Muted_DescriptionInputs */
/** @typedef {{}} Comment_Continue_GithubInputs */
/** @typedef {{}} Comment_Continue_GoogleInputs */
/** @typedef {{}} Comment_EmailInputs */
/** @typedef {{}} Comment_Email_Verification_SentInputs */
/** @typedef {{}} Comment_ErrorInputs */
/** @typedef {{}} Comment_Login_DescriptionInputs */
/** @typedef {{}} Comment_Login_RequiredInputs */
/** @typedef {{}} Comment_NameInputs */
/** @typedef {{}} Comment_Cancel_ReplyInputs */
/** @typedef {{}} Comment_ReplyInputs */
/** @typedef {{ name: NonNullable<unknown> }} Comment_Replying_ToInputs */
/** @typedef {{ name: NonNullable<unknown> }} Comment_Signed_In_AsInputs */
/** @typedef {{}} Comment_SubmittingInputs */
/** @typedef {{}} Comment_Pending_BadgeInputs */
/** @typedef {{}} Comment_Pending_SuccessInputs */
/** @typedef {{}} Comment_Pending_Visible_NoteInputs */
/** @typedef {{}} Comment_SuccessInputs */
/** @typedef {{}} Comment_Switch_To_LoginInputs */
/** @typedef {{}} Comment_Switch_To_SignupInputs */
/** @typedef {{}} CommentsInputs */
/** @typedef {{}} Comments_DescriptionInputs */
/** @typedef {{}} Comments_DisabledInputs */
/** @typedef {{}} ContentsInputs */
/** @typedef {{}} Feature_Api_TitleInputs */
/** @typedef {{}} Feature_Api_BodyInputs */
/** @typedef {{}} Feature_D1_BodyInputs */
/** @typedef {{}} Feature_Moderation_TitleInputs */
/** @typedef {{}} Feature_Moderation_BodyInputs */
/** @typedef {{}} Feature_R2_BodyInputs */
/** @typedef {{}} FeaturedInputs */
/** @typedef {{}} Github_RepositoryInputs */
/** @typedef {{}} Home_Bilingual_Intro_EnInputs */
/** @typedef {{}} Home_Bilingual_Intro_ZhInputs */
/** @typedef {{}} Home_EyebrowInputs */
/** @typedef {{}} Home_Featured_TitleInputs */
/** @typedef {{}} Home_Tags_DescriptionInputs */
/** @typedef {{}} LanguageInputs */
/** @typedef {{}} Language_EnglishInputs */
/** @typedef {{}} Language_Switch_To_EnInputs */
/** @typedef {{}} Language_Switch_To_ZhInputs */
/** @typedef {{}} Language_ZhInputs */
/** @typedef {{}} Latest_PostsInputs */
/** @typedef {{}} Layout_Preset_DeveloperInputs */
/** @typedef {{}} Layout_Preset_JournalInputs */
/** @typedef {{}} Layout_Preset_ShelfInputs */
/** @typedef {{}} LoginInputs */
/** @typedef {{}} Login_AlternativeInputs */
/** @typedef {{}} Login_EmailInputs */
/** @typedef {{}} Login_Email_PlaceholderInputs */
/** @typedef {{}} Login_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Login_GreetingInputs */
/** @typedef {{}} Login_No_AccountInputs */
/** @typedef {{}} Login_PasswordInputs */
/** @typedef {{}} Login_Password_PlaceholderInputs */
/** @typedef {{}} Login_PendingInputs */
/** @typedef {{ provider: NonNullable<unknown> }} Login_Social_ErrorInputs */
/** @typedef {{ provider: NonNullable<unknown> }} Login_Social_PendingInputs */
/** @typedef {{ provider: NonNullable<unknown> }} Login_With_ProviderInputs */
/** @typedef {{}} Password_Reset_ConfirmInputs */
/** @typedef {{}} Password_Reset_Confirm_ErrorInputs */
/** @typedef {{}} Password_Reset_Confirm_PendingInputs */
/** @typedef {{}} Password_Reset_Confirm_SuccessInputs */
/** @typedef {{}} Password_Reset_LinkInputs */
/** @typedef {{}} Password_Reset_New_PasswordInputs */
/** @typedef {{}} Password_Reset_RequestInputs */
/** @typedef {{}} Password_Reset_Request_ErrorInputs */
/** @typedef {{}} Password_Reset_Request_PendingInputs */
/** @typedef {{}} Password_Reset_Request_SuccessInputs */
/** @typedef {{}} Password_Reset_TitleInputs */
/** @typedef {{}} Nav_AboutInputs */
/** @typedef {{}} Nav_BlogInputs */
/** @typedef {{}} Nav_DocsInputs */
/** @typedef {{}} Nav_SeriesInputs */
/** @typedef {{}} Nav_TagsInputs */
/** @typedef {{}} Open_AdminInputs */
/** @typedef {{}} PinnedInputs */
/** @typedef {{}} Pagination_NextInputs */
/** @typedef {{ current: NonNullable<unknown>, total: NonNullable<unknown> }} Pagination_PageInputs */
/** @typedef {{}} Pagination_PreviousInputs */
/** @typedef {{ count: NonNullable<unknown> }} Posts_CountInputs */
/** @typedef {{ count: NonNullable<unknown> }} Published_CountInputs */
/** @typedef {{}} Read_Latest_PostsInputs */
/** @typedef {{}} RelatedInputs */
/** @typedef {{}} Rss_FeedInputs */
/** @typedef {{}} Series_EyebrowInputs */
/** @typedef {{}} Series_TitleInputs */
/** @typedef {{}} Site_SubtitleInputs */
/** @typedef {{}} SignupInputs */
/** @typedef {{}} Signup_Confirm_PasswordInputs */
/** @typedef {{}} Signup_Confirm_Password_PlaceholderInputs */
/** @typedef {{}} Signup_ErrorInputs */
/** @typedef {{ name: NonNullable<unknown> }} Signup_GreetingInputs */
/** @typedef {{}} Signup_Has_AccountInputs */
/** @typedef {{}} Signup_NameInputs */
/** @typedef {{}} Signup_Name_PlaceholderInputs */
/** @typedef {{}} Signup_Name_RequiredInputs */
/** @typedef {{}} Signup_Password_HideInputs */
/** @typedef {{}} Signup_Password_MismatchInputs */
/** @typedef {{}} Signup_Password_ShowInputs */
/** @typedef {{}} Signup_PendingInputs */
/** @typedef {{}} Sign_OutInputs */
/** @typedef {{}} Submit_CommentInputs */
/** @typedef {{}} Tag_EyebrowInputs */
/** @typedef {{}} Tags_TitleInputs */
/** @typedef {{}} Theme_DarkInputs */
/** @typedef {{}} Theme_LightInputs */
/** @typedef {{}} Theme_Preset_AppleInputs */
/** @typedef {{}} Theme_Preset_ClaudeInputs */
/** @typedef {{}} Theme_Preset_EditorialInputs */
/** @typedef {{}} Theme_Preset_BrutalistInputs */
/** @typedef {{}} Theme_Preset_MakerInputs */
/** @typedef {{}} Theme_SystemInputs */
/** @typedef {{}} Theme_ToggleInputs */
/** @typedef {{}} UpdatedInputs */
/** @typedef {{}} UploadInputs */
/** @typedef {{}} View_All_PostsInputs */
import * as __en from "./en.js"
import * as __zh from "./zh.js"
/**
* | output |
* | --- |
* | "Admin" |
*
* @param {AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin = /** @type {((inputs?: AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin(inputs)
	return __zh.admin(inputs)
});
/**
* | output |
* | --- |
* | "R2-backed images and attachments." |
*
* @param {Admin_Assets_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_description = /** @type {((inputs?: Admin_Assets_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_description(inputs)
	return __zh.admin_assets_description(inputs)
});
/**
* | output |
* | --- |
* | "Copied" |
*
* @param {Admin_Assets_CopiedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_copied = /** @type {((inputs?: Admin_Assets_CopiedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_CopiedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_copied(inputs)
	return __zh.admin_assets_copied(inputs)
});
/**
* | output |
* | --- |
* | "Copy Markdown" |
*
* @param {Admin_Assets_Copy_MarkdownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_copy_markdown = /** @type {((inputs?: Admin_Assets_Copy_MarkdownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_Copy_MarkdownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_copy_markdown(inputs)
	return __zh.admin_assets_copy_markdown(inputs)
});
/**
* | output |
* | --- |
* | "Copy URL" |
*
* @param {Admin_Assets_Copy_UrlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_copy_url = /** @type {((inputs?: Admin_Assets_Copy_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_Copy_UrlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_copy_url(inputs)
	return __zh.admin_assets_copy_url(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Admin_Assets_DeleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_delete = /** @type {((inputs?: Admin_Assets_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_delete(inputs)
	return __zh.admin_assets_delete(inputs)
});
/**
* | output |
* | --- |
* | "Choose multiple images or drop them here." |
*
* @param {Admin_Assets_Drop_HintInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_drop_hint = /** @type {((inputs?: Admin_Assets_Drop_HintInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_Drop_HintInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_drop_hint(inputs)
	return __zh.admin_assets_drop_hint(inputs)
});
/**
* | output |
* | --- |
* | "No assets yet." |
*
* @param {Admin_Assets_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_empty = /** @type {((inputs?: Admin_Assets_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_empty(inputs)
	return __zh.admin_assets_empty(inputs)
});
/**
* | output |
* | --- |
* | "Asset could not be uploaded." |
*
* @param {Admin_Assets_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_error = /** @type {((inputs?: Admin_Assets_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_error(inputs)
	return __zh.admin_assets_error(inputs)
});
/**
* | output |
* | --- |
* | "Filename" |
*
* @param {Admin_Assets_FilenameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_filename = /** @type {((inputs?: Admin_Assets_FilenameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_FilenameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_filename(inputs)
	return __zh.admin_assets_filename(inputs)
});
/**
* | output |
* | --- |
* | "Markdown copied" |
*
* @param {Admin_Assets_Markdown_CopiedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_markdown_copied = /** @type {((inputs?: Admin_Assets_Markdown_CopiedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_Markdown_CopiedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_markdown_copied(inputs)
	return __zh.admin_assets_markdown_copied(inputs)
});
/**
* | output |
* | --- |
* | "No assets match the search." |
*
* @param {Admin_Assets_No_MatchesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_no_matches = /** @type {((inputs?: Admin_Assets_No_MatchesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_No_MatchesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_no_matches(inputs)
	return __zh.admin_assets_no_matches(inputs)
});
/**
* | output |
* | --- |
* | "Search assets" |
*
* @param {Admin_Assets_SearchInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_search = /** @type {((inputs?: Admin_Assets_SearchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_SearchInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_search(inputs)
	return __zh.admin_assets_search(inputs)
});
/**
* | output |
* | --- |
* | "Filename, type, or key" |
*
* @param {Admin_Assets_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_search_placeholder = /** @type {((inputs?: Admin_Assets_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_search_placeholder(inputs)
	return __zh.admin_assets_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Assets" |
*
* @param {Admin_Assets_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_title = /** @type {((inputs?: Admin_Assets_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_title(inputs)
	return __zh.admin_assets_title(inputs)
});
/**
* | output |
* | --- |
* | "Asset upload accepted." |
*
* @param {Admin_Assets_UploadedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_uploaded = /** @type {((inputs?: Admin_Assets_UploadedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_UploadedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_uploaded(inputs)
	return __zh.admin_assets_uploaded(inputs)
});
/**
* | output |
* | --- |
* | "Uploading..." |
*
* @param {Admin_Assets_UploadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_uploading = /** @type {((inputs?: Admin_Assets_UploadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_UploadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_uploading(inputs)
	return __zh.admin_assets_uploading(inputs)
});
/**
* | output |
* | --- |
* | "Asset URL" |
*
* @param {Admin_Assets_UrlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_assets_url = /** @type {((inputs?: Admin_Assets_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Assets_UrlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_assets_url(inputs)
	return __zh.admin_assets_url(inputs)
});
/**
* | output |
* | --- |
* | "Approve" |
*
* @param {Admin_Comments_ApproveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_approve = /** @type {((inputs?: Admin_Comments_ApproveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_ApproveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_approve(inputs)
	return __zh.admin_comments_approve(inputs)
});
/**
* | output |
* | --- |
* | "All posts" |
*
* @param {Admin_Comments_All_PostsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_all_posts = /** @type {((inputs?: Admin_Comments_All_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_All_PostsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_all_posts(inputs)
	return __zh.admin_comments_all_posts(inputs)
});
/**
* | output |
* | --- |
* | "Auto-block comments with blocked keywords" |
*
* @param {Admin_Comments_Auto_BlockInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_auto_block = /** @type {((inputs?: Admin_Comments_Auto_BlockInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Auto_BlockInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_auto_block(inputs)
	return __zh.admin_comments_auto_block(inputs)
});
/**
* | output |
* | --- |
* | "Approve selected" |
*
* @param {Admin_Comments_Batch_ApproveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_batch_approve = /** @type {((inputs?: Admin_Comments_Batch_ApproveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Batch_ApproveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_batch_approve(inputs)
	return __zh.admin_comments_batch_approve(inputs)
});
/**
* | output |
* | --- |
* | "Delete selected" |
*
* @param {Admin_Comments_Batch_DeleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_batch_delete = /** @type {((inputs?: Admin_Comments_Batch_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Batch_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_batch_delete(inputs)
	return __zh.admin_comments_batch_delete(inputs)
});
/**
* | output |
* | --- |
* | "Mark selected spam" |
*
* @param {Admin_Comments_Batch_SpamInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_batch_spam = /** @type {((inputs?: Admin_Comments_Batch_SpamInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Batch_SpamInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_batch_spam(inputs)
	return __zh.admin_comments_batch_spam(inputs)
});
/**
* | output |
* | --- |
* | "Blocked keywords" |
*
* @param {Admin_Comments_Blocked_KeywordsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_blocked_keywords = /** @type {((inputs?: Admin_Comments_Blocked_KeywordsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Blocked_KeywordsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_blocked_keywords(inputs)
	return __zh.admin_comments_blocked_keywords(inputs)
});
/**
* | output |
* | --- |
* | "One keyword per line, or separate with commas. Matching comments are marked as spam automatically." |
*
* @param {Admin_Comments_Blocked_Keywords_HelpInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_blocked_keywords_help = /** @type {((inputs?: Admin_Comments_Blocked_Keywords_HelpInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Blocked_Keywords_HelpInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_blocked_keywords_help(inputs)
	return __zh.admin_comments_blocked_keywords_help(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Admin_Comments_DeleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_delete = /** @type {((inputs?: Admin_Comments_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_delete(inputs)
	return __zh.admin_comments_delete(inputs)
});
/**
* | output |
* | --- |
* | "Review pending comments before they appear publicly." |
*
* @param {Admin_Comments_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_description = /** @type {((inputs?: Admin_Comments_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_description(inputs)
	return __zh.admin_comments_description(inputs)
});
/**
* | output |
* | --- |
* | "No comments match the current filters." |
*
* @param {Admin_Comments_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_empty = /** @type {((inputs?: Admin_Comments_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_empty(inputs)
	return __zh.admin_comments_empty(inputs)
});
/**
* | output |
* | --- |
* | "Filter by post" |
*
* @param {Admin_Comments_Filter_PostInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_filter_post = /** @type {((inputs?: Admin_Comments_Filter_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Filter_PostInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_filter_post(inputs)
	return __zh.admin_comments_filter_post(inputs)
});
/**
* | output |
* | --- |
* | "Mark spam" |
*
* @param {Admin_Comments_Mark_SpamInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_mark_spam = /** @type {((inputs?: Admin_Comments_Mark_SpamInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Mark_SpamInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_mark_spam(inputs)
	return __zh.admin_comments_mark_spam(inputs)
});
/**
* | output |
* | --- |
* | "{count} pending" |
*
* @param {Admin_Comments_Pending_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_pending_count = /** @type {((inputs: Admin_Comments_Pending_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Pending_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_pending_count(inputs)
	return __zh.admin_comments_pending_count(inputs)
});
/**
* | output |
* | --- |
* | "Require manual approval before publication" |
*
* @param {Admin_Comments_Require_ApprovalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_require_approval = /** @type {((inputs?: Admin_Comments_Require_ApprovalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Require_ApprovalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_require_approval(inputs)
	return __zh.admin_comments_require_approval(inputs)
});
/**
* | output |
* | --- |
* | "Search comments" |
*
* @param {Admin_Comments_SearchInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_search = /** @type {((inputs?: Admin_Comments_SearchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_SearchInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_search(inputs)
	return __zh.admin_comments_search(inputs)
});
/**
* | output |
* | --- |
* | "Author, body, or post title" |
*
* @param {Admin_Comments_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_search_placeholder = /** @type {((inputs?: Admin_Comments_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_search_placeholder(inputs)
	return __zh.admin_comments_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Select all visible comments" |
*
* @param {Admin_Comments_Select_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_select_all = /** @type {((inputs?: Admin_Comments_Select_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Select_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_select_all(inputs)
	return __zh.admin_comments_select_all(inputs)
});
/**
* | output |
* | --- |
* | "Select comment from {author}" |
*
* @param {Admin_Comments_Select_OneInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_select_one = /** @type {((inputs: Admin_Comments_Select_OneInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Select_OneInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_select_one(inputs)
	return __zh.admin_comments_select_one(inputs)
});
/**
* | output |
* | --- |
* | "{count} selected" |
*
* @param {Admin_Comments_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_selected = /** @type {((inputs: Admin_Comments_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_selected(inputs)
	return __zh.admin_comments_selected(inputs)
});
/**
* | output |
* | --- |
* | "All statuses" |
*
* @param {Admin_Comments_Status_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_status_all = /** @type {((inputs?: Admin_Comments_Status_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Status_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_status_all(inputs)
	return __zh.admin_comments_status_all(inputs)
});
/**
* | output |
* | --- |
* | "Approved" |
*
* @param {Admin_Comments_Status_ApprovedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_status_approved = /** @type {((inputs?: Admin_Comments_Status_ApprovedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Status_ApprovedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_status_approved(inputs)
	return __zh.admin_comments_status_approved(inputs)
});
/**
* | output |
* | --- |
* | "Deleted" |
*
* @param {Admin_Comments_Status_DeletedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_status_deleted = /** @type {((inputs?: Admin_Comments_Status_DeletedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Status_DeletedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_status_deleted(inputs)
	return __zh.admin_comments_status_deleted(inputs)
});
/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Admin_Comments_Status_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_status_pending = /** @type {((inputs?: Admin_Comments_Status_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Status_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_status_pending(inputs)
	return __zh.admin_comments_status_pending(inputs)
});
/**
* | output |
* | --- |
* | "Spam" |
*
* @param {Admin_Comments_Status_SpamInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_status_spam = /** @type {((inputs?: Admin_Comments_Status_SpamInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_Status_SpamInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_status_spam(inputs)
	return __zh.admin_comments_status_spam(inputs)
});
/**
* | output |
* | --- |
* | "Comments" |
*
* @param {Admin_Comments_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_title = /** @type {((inputs?: Admin_Comments_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_title(inputs)
	return __zh.admin_comments_title(inputs)
});
/**
* | output |
* | --- |
* | "View post" |
*
* @param {Admin_Comments_View_PostInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comments_view_post = /** @type {((inputs?: Admin_Comments_View_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comments_View_PostInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comments_view_post(inputs)
	return __zh.admin_comments_view_post(inputs)
});
/**
* | output |
* | --- |
* | "Comment settings" |
*
* @param {Admin_Comment_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_comment_settings = /** @type {((inputs?: Admin_Comment_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Comment_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_comment_settings(inputs)
	return __zh.admin_comment_settings(inputs)
});
/**
* | output |
* | --- |
* | "A short summary for the new post." |
*
* @param {Admin_Editor_Default_ExcerptInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_default_excerpt = /** @type {((inputs?: Admin_Editor_Default_ExcerptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Default_ExcerptInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_default_excerpt(inputs)
	return __zh.admin_editor_default_excerpt(inputs)
});
/**
* | output |
* | --- |
* | "New bilingual post" |
*
* @param {Admin_Editor_Default_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_default_title = /** @type {((inputs?: Admin_Editor_Default_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Default_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_default_title(inputs)
	return __zh.admin_editor_default_title(inputs)
});
/**
* | output |
* | --- |
* | "Allow comments on this post" |
*
* @param {Admin_Editor_Comments_EnabledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_comments_enabled = /** @type {((inputs?: Admin_Editor_Comments_EnabledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Comments_EnabledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_comments_enabled(inputs)
	return __zh.admin_editor_comments_enabled(inputs)
});
/**
* | output |
* | --- |
* | "Supports Markdown syntax and direct image paste. Pasted images are uploaded to the R2 bucket and inserted into the post." |
*
* @param {Admin_Editor_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_description = /** @type {((inputs?: Admin_Editor_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_description(inputs)
	return __zh.admin_editor_description(inputs)
});
/**
* | output |
* | --- |
* | "Edit post" |
*
* @param {Admin_Editor_Edit_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_edit_title = /** @type {((inputs?: Admin_Editor_Edit_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Edit_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_edit_title(inputs)
	return __zh.admin_editor_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "Post could not be saved." |
*
* @param {Admin_Editor_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_error = /** @type {((inputs?: Admin_Editor_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_error(inputs)
	return __zh.admin_editor_error(inputs)
});
/**
* | output |
* | --- |
* | "Excerpt" |
*
* @param {Admin_Editor_ExcerptInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_excerpt = /** @type {((inputs?: Admin_Editor_ExcerptInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_ExcerptInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_excerpt(inputs)
	return __zh.admin_editor_excerpt(inputs)
});
/**
* | output |
* | --- |
* | "Choose uploaded image" |
*
* @param {Admin_Editor_Cover_AssetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_cover_asset = /** @type {((inputs?: Admin_Editor_Cover_AssetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Cover_AssetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_cover_asset(inputs)
	return __zh.admin_editor_cover_asset(inputs)
});
/**
* | output |
* | --- |
* | "Select an image" |
*
* @param {Admin_Editor_Cover_Asset_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_cover_asset_placeholder = /** @type {((inputs?: Admin_Editor_Cover_Asset_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Cover_Asset_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_cover_asset_placeholder(inputs)
	return __zh.admin_editor_cover_asset_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Cover image" |
*
* @param {Admin_Editor_Cover_ImageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_cover_image = /** @type {((inputs?: Admin_Editor_Cover_ImageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Cover_ImageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_cover_image(inputs)
	return __zh.admin_editor_cover_image(inputs)
});
/**
* | output |
* | --- |
* | "Feature this post" |
*
* @param {Admin_Editor_FeaturedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_featured = /** @type {((inputs?: Admin_Editor_FeaturedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_FeaturedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_featured(inputs)
	return __zh.admin_editor_featured(inputs)
});
/**
* | output |
* | --- |
* | "Pin this post" |
*
* @param {Admin_Editor_PinnedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_pinned = /** @type {((inputs?: Admin_Editor_PinnedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_PinnedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_pinned(inputs)
	return __zh.admin_editor_pinned(inputs)
});
/**
* | output |
* | --- |
* | "Preview" |
*
* @param {Admin_Editor_Preview_ModeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_preview_mode = /** @type {((inputs?: Admin_Editor_Preview_ModeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Preview_ModeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_preview_mode(inputs)
	return __zh.admin_editor_preview_mode(inputs)
});
/**
* | output |
* | --- |
* | "Publish at" |
*
* @param {Admin_Editor_Publish_AtInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_publish_at = /** @type {((inputs?: Admin_Editor_Publish_AtInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Publish_AtInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_publish_at(inputs)
	return __zh.admin_editor_publish_at(inputs)
});
/**
* | output |
* | --- |
* | "Editor" |
*
* @param {Admin_Editor_Rich_ModeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_rich_mode = /** @type {((inputs?: Admin_Editor_Rich_ModeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Rich_ModeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_rich_mode(inputs)
	return __zh.admin_editor_rich_mode(inputs)
});
/**
* | output |
* | --- |
* | "Post saved through the API." |
*
* @param {Admin_Editor_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_saved = /** @type {((inputs?: Admin_Editor_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_saved(inputs)
	return __zh.admin_editor_saved(inputs)
});
/**
* | output |
* | --- |
* | "SEO description" |
*
* @param {Admin_Editor_Seo_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_seo_description = /** @type {((inputs?: Admin_Editor_Seo_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Seo_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_seo_description(inputs)
	return __zh.admin_editor_seo_description(inputs)
});
/**
* | output |
* | --- |
* | "SEO title" |
*
* @param {Admin_Editor_Seo_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_seo_title = /** @type {((inputs?: Admin_Editor_Seo_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Seo_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_seo_title(inputs)
	return __zh.admin_editor_seo_title(inputs)
});
/**
* | output |
* | --- |
* | "Series" |
*
* @param {Admin_Editor_SeriesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_series = /** @type {((inputs?: Admin_Editor_SeriesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_SeriesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_series(inputs)
	return __zh.admin_editor_series(inputs)
});
/**
* | output |
* | --- |
* | "No series" |
*
* @param {Admin_Editor_Series_NoneInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_series_none = /** @type {((inputs?: Admin_Editor_Series_NoneInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Series_NoneInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_series_none(inputs)
	return __zh.admin_editor_series_none(inputs)
});
/**
* | output |
* | --- |
* | "Source" |
*
* @param {Admin_Editor_Source_ModeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_source_mode = /** @type {((inputs?: Admin_Editor_Source_ModeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_Source_ModeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_source_mode(inputs)
	return __zh.admin_editor_source_mode(inputs)
});
/**
* | output |
* | --- |
* | "Tags" |
*
* @param {Admin_Editor_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_tags = /** @type {((inputs?: Admin_Editor_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_tags(inputs)
	return __zh.admin_editor_tags(inputs)
});
/**
* | output |
* | --- |
* | "Markdown editor" |
*
* @param {Admin_Editor_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_editor_title = /** @type {((inputs?: Admin_Editor_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Editor_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_editor_title(inputs)
	return __zh.admin_editor_title(inputs)
});
/**
* | output |
* | --- |
* | "Latest post" |
*
* @param {Admin_Latest_PostInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_latest_post = /** @type {((inputs?: Admin_Latest_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Latest_PostInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_latest_post(inputs)
	return __zh.admin_latest_post(inputs)
});
/**
* | output |
* | --- |
* | "Manage posts" |
*
* @param {Admin_Manage_PostsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_manage_posts = /** @type {((inputs?: Admin_Manage_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Manage_PostsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_manage_posts(inputs)
	return __zh.admin_manage_posts(inputs)
});
/**
* | output |
* | --- |
* | "Manage posts, assets, comments, API tokens, and site settings for {name}." |
*
* @param {Admin_Metric_Overview_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_metric_overview_description = /** @type {((inputs: Admin_Metric_Overview_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Metric_Overview_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_metric_overview_description(inputs)
	return __zh.admin_metric_overview_description(inputs)
});
/**
* | output |
* | --- |
* | "Moderation queue" |
*
* @param {Admin_Moderation_QueueInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_moderation_queue = /** @type {((inputs?: Admin_Moderation_QueueInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Moderation_QueueInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_moderation_queue(inputs)
	return __zh.admin_moderation_queue(inputs)
});
/**
* | output |
* | --- |
* | "{count} comment is waiting for review. New public comments default to pending." |
*
* @param {Admin_Moderation_Queue_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_moderation_queue_detail = /** @type {((inputs: Admin_Moderation_Queue_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Moderation_Queue_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_moderation_queue_detail(inputs)
	return __zh.admin_moderation_queue_detail(inputs)
});
/**
* | output |
* | --- |
* | "Assets" |
*
* @param {Admin_Nav_AssetsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_nav_assets = /** @type {((inputs?: Admin_Nav_AssetsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_AssetsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_nav_assets(inputs)
	return __zh.admin_nav_assets(inputs)
});
/**
* | output |
* | --- |
* | "Comments" |
*
* @param {Admin_Nav_CommentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_nav_comments = /** @type {((inputs?: Admin_Nav_CommentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_CommentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_nav_comments(inputs)
	return __zh.admin_nav_comments(inputs)
});
/**
* | output |
* | --- |
* | "Overview" |
*
* @param {Admin_Nav_OverviewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_nav_overview = /** @type {((inputs?: Admin_Nav_OverviewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_OverviewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_nav_overview(inputs)
	return __zh.admin_nav_overview(inputs)
});
/**
* | output |
* | --- |
* | "Posts" |
*
* @param {Admin_Nav_PostsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_nav_posts = /** @type {((inputs?: Admin_Nav_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_PostsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_nav_posts(inputs)
	return __zh.admin_nav_posts(inputs)
});
/**
* | output |
* | --- |
* | "Series" |
*
* @param {Admin_Nav_SeriesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_nav_series = /** @type {((inputs?: Admin_Nav_SeriesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_SeriesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_nav_series(inputs)
	return __zh.admin_nav_series(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Admin_Nav_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_nav_settings = /** @type {((inputs?: Admin_Nav_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_nav_settings(inputs)
	return __zh.admin_nav_settings(inputs)
});
/**
* | output |
* | --- |
* | "Users" |
*
* @param {Admin_Nav_UsersInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_nav_users = /** @type {((inputs?: Admin_Nav_UsersInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Nav_UsersInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_nav_users(inputs)
	return __zh.admin_nav_users(inputs)
});
/**
* | output |
* | --- |
* | "New post" |
*
* @param {Admin_New_PostInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_new_post = /** @type {((inputs?: Admin_New_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_New_PostInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_new_post(inputs)
	return __zh.admin_new_post(inputs)
});
/**
* | output |
* | --- |
* | "Admin" |
*
* @param {Admin_Overview_EyebrowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_overview_eyebrow = /** @type {((inputs?: Admin_Overview_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Overview_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_overview_eyebrow(inputs)
	return __zh.admin_overview_eyebrow(inputs)
});
/**
* | output |
* | --- |
* | "Publishing overview" |
*
* @param {Admin_Overview_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_overview_title = /** @type {((inputs?: Admin_Overview_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Overview_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_overview_title(inputs)
	return __zh.admin_overview_title(inputs)
});
/**
* | output |
* | --- |
* | "Kept in admin, hidden publicly." |
*
* @param {Admin_Post_Status_Archived_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_archived_description = /** @type {((inputs?: Admin_Post_Status_Archived_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Archived_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_archived_description(inputs)
	return __zh.admin_post_status_archived_description(inputs)
});
/**
* | output |
* | --- |
* | "Archived" |
*
* @param {Admin_Post_Status_Archived_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_archived_label = /** @type {((inputs?: Admin_Post_Status_Archived_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Archived_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_archived_label(inputs)
	return __zh.admin_post_status_archived_label(inputs)
});
/**
* | output |
* | --- |
* | "Deleted record, hidden by default." |
*
* @param {Admin_Post_Status_Deleted_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_deleted_description = /** @type {((inputs?: Admin_Post_Status_Deleted_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Deleted_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_deleted_description(inputs)
	return __zh.admin_post_status_deleted_description(inputs)
});
/**
* | output |
* | --- |
* | "Deleted" |
*
* @param {Admin_Post_Status_Deleted_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_deleted_label = /** @type {((inputs?: Admin_Post_Status_Deleted_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Deleted_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_deleted_label(inputs)
	return __zh.admin_post_status_deleted_label(inputs)
});
/**
* | output |
* | --- |
* | "Admin only." |
*
* @param {Admin_Post_Status_Draft_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_draft_description = /** @type {((inputs?: Admin_Post_Status_Draft_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Draft_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_draft_description(inputs)
	return __zh.admin_post_status_draft_description(inputs)
});
/**
* | output |
* | --- |
* | "Draft" |
*
* @param {Admin_Post_Status_Draft_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_draft_label = /** @type {((inputs?: Admin_Post_Status_Draft_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Draft_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_draft_label(inputs)
	return __zh.admin_post_status_draft_label(inputs)
});
/**
* | output |
* | --- |
* | "Public immediately." |
*
* @param {Admin_Post_Status_Published_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_published_description = /** @type {((inputs?: Admin_Post_Status_Published_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Published_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_published_description(inputs)
	return __zh.admin_post_status_published_description(inputs)
});
/**
* | output |
* | --- |
* | "Published" |
*
* @param {Admin_Post_Status_Published_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_published_label = /** @type {((inputs?: Admin_Post_Status_Published_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Published_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_published_label(inputs)
	return __zh.admin_post_status_published_label(inputs)
});
/**
* | output |
* | --- |
* | "Public at publish time." |
*
* @param {Admin_Post_Status_Scheduled_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_scheduled_description = /** @type {((inputs?: Admin_Post_Status_Scheduled_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Scheduled_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_scheduled_description(inputs)
	return __zh.admin_post_status_scheduled_description(inputs)
});
/**
* | output |
* | --- |
* | "Scheduled" |
*
* @param {Admin_Post_Status_Scheduled_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_post_status_scheduled_label = /** @type {((inputs?: Admin_Post_Status_Scheduled_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Post_Status_Scheduled_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_post_status_scheduled_label(inputs)
	return __zh.admin_post_status_scheduled_label(inputs)
});
/**
* | output |
* | --- |
* | "Actions" |
*
* @param {Admin_Posts_ActionsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_actions = /** @type {((inputs?: Admin_Posts_ActionsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_ActionsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_actions(inputs)
	return __zh.admin_posts_actions(inputs)
});
/**
* | output |
* | --- |
* | "Archive" |
*
* @param {Admin_Posts_ArchiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_archive = /** @type {((inputs?: Admin_Posts_ArchiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_ArchiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_archive(inputs)
	return __zh.admin_posts_archive(inputs)
});
/**
* | output |
* | --- |
* | "Title" |
*
* @param {Admin_Posts_Column_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_column_title = /** @type {((inputs?: Admin_Posts_Column_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Column_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_column_title(inputs)
	return __zh.admin_posts_column_title(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Admin_Posts_DeleteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_delete = /** @type {((inputs?: Admin_Posts_DeleteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_DeleteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_delete(inputs)
	return __zh.admin_posts_delete(inputs)
});
/**
* | output |
* | --- |
* | "Manage writing, publishing, tags, and series." |
*
* @param {Admin_Posts_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_description = /** @type {((inputs?: Admin_Posts_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_description(inputs)
	return __zh.admin_posts_description(inputs)
});
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Admin_Posts_EditInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_edit = /** @type {((inputs?: Admin_Posts_EditInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_EditInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_edit(inputs)
	return __zh.admin_posts_edit(inputs)
});
/**
* | output |
* | --- |
* | "All statuses" |
*
* @param {Admin_Posts_Filter_All_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_filter_all_status = /** @type {((inputs?: Admin_Posts_Filter_All_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Filter_All_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_filter_all_status(inputs)
	return __zh.admin_posts_filter_all_status(inputs)
});
/**
* | output |
* | --- |
* | "All series" |
*
* @param {Admin_Posts_Filter_All_SeriesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_filter_all_series = /** @type {((inputs?: Admin_Posts_Filter_All_SeriesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Filter_All_SeriesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_filter_all_series(inputs)
	return __zh.admin_posts_filter_all_series(inputs)
});
/**
* | output |
* | --- |
* | "All tags" |
*
* @param {Admin_Posts_Filter_All_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_filter_all_tags = /** @type {((inputs?: Admin_Posts_Filter_All_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Filter_All_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_filter_all_tags(inputs)
	return __zh.admin_posts_filter_all_tags(inputs)
});
/**
* | output |
* | --- |
* | "Filter by series" |
*
* @param {Admin_Posts_Filter_SeriesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_filter_series = /** @type {((inputs?: Admin_Posts_Filter_SeriesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Filter_SeriesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_filter_series(inputs)
	return __zh.admin_posts_filter_series(inputs)
});
/**
* | output |
* | --- |
* | "Filter by status" |
*
* @param {Admin_Posts_Filter_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_filter_status = /** @type {((inputs?: Admin_Posts_Filter_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Filter_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_filter_status(inputs)
	return __zh.admin_posts_filter_status(inputs)
});
/**
* | output |
* | --- |
* | "Filter by tag" |
*
* @param {Admin_Posts_Filter_TagInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_filter_tag = /** @type {((inputs?: Admin_Posts_Filter_TagInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Filter_TagInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_filter_tag(inputs)
	return __zh.admin_posts_filter_tag(inputs)
});
/**
* | output |
* | --- |
* | "Move to draft" |
*
* @param {Admin_Posts_Move_To_DraftInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_move_to_draft = /** @type {((inputs?: Admin_Posts_Move_To_DraftInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Move_To_DraftInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_move_to_draft(inputs)
	return __zh.admin_posts_move_to_draft(inputs)
});
/**
* | output |
* | --- |
* | "No series" |
*
* @param {Admin_Posts_No_SeriesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_no_series = /** @type {((inputs?: Admin_Posts_No_SeriesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_No_SeriesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_no_series(inputs)
	return __zh.admin_posts_no_series(inputs)
});
/**
* | output |
* | --- |
* | "Not public" |
*
* @param {Admin_Posts_Not_PublicInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_not_public = /** @type {((inputs?: Admin_Posts_Not_PublicInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Not_PublicInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_not_public(inputs)
	return __zh.admin_posts_not_public(inputs)
});
/**
* | output |
* | --- |
* | "Public URL" |
*
* @param {Admin_Posts_Public_UrlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_public_url = /** @type {((inputs?: Admin_Posts_Public_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Public_UrlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_public_url(inputs)
	return __zh.admin_posts_public_url(inputs)
});
/**
* | output |
* | --- |
* | "Search posts" |
*
* @param {Admin_Posts_SearchInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_search = /** @type {((inputs?: Admin_Posts_SearchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_SearchInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_search(inputs)
	return __zh.admin_posts_search(inputs)
});
/**
* | output |
* | --- |
* | "Select all visible posts" |
*
* @param {Admin_Posts_Select_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_select_all = /** @type {((inputs?: Admin_Posts_Select_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Select_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_select_all(inputs)
	return __zh.admin_posts_select_all(inputs)
});
/**
* | output |
* | --- |
* | "Select {title}" |
*
* @param {Admin_Posts_Select_OneInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_select_one = /** @type {((inputs: Admin_Posts_Select_OneInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Select_OneInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_select_one(inputs)
	return __zh.admin_posts_select_one(inputs)
});
/**
* | output |
* | --- |
* | "{count} selected" |
*
* @param {Admin_Posts_SelectedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_selected = /** @type {((inputs: Admin_Posts_SelectedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_SelectedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_selected(inputs)
	return __zh.admin_posts_selected(inputs)
});
/**
* | output |
* | --- |
* | "Source" |
*
* @param {Admin_Posts_SourceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_source = /** @type {((inputs?: Admin_Posts_SourceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_SourceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_source(inputs)
	return __zh.admin_posts_source(inputs)
});
/**
* | output |
* | --- |
* | "Status" |
*
* @param {Admin_Posts_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_status = /** @type {((inputs?: Admin_Posts_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_status(inputs)
	return __zh.admin_posts_status(inputs)
});
/**
* | output |
* | --- |
* | "Public visibility depends on status and publish time." |
*
* @param {Admin_Posts_Status_HelpInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_status_help = /** @type {((inputs?: Admin_Posts_Status_HelpInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_Status_HelpInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_status_help(inputs)
	return __zh.admin_posts_status_help(inputs)
});
/**
* | output |
* | --- |
* | "Posts" |
*
* @param {Admin_Posts_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_title = /** @type {((inputs?: Admin_Posts_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_title(inputs)
	return __zh.admin_posts_title(inputs)
});
/**
* | output |
* | --- |
* | "Updated" |
*
* @param {Admin_Posts_UpdatedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_updated = /** @type {((inputs?: Admin_Posts_UpdatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_UpdatedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_updated(inputs)
	return __zh.admin_posts_updated(inputs)
});
/**
* | output |
* | --- |
* | "View" |
*
* @param {Admin_Posts_ViewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_posts_view = /** @type {((inputs?: Admin_Posts_ViewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Posts_ViewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_posts_view(inputs)
	return __zh.admin_posts_view(inputs)
});
/**
* | output |
* | --- |
* | "Publish" |
*
* @param {Admin_Publish_PostInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_publish_post = /** @type {((inputs?: Admin_Publish_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Publish_PostInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_publish_post(inputs)
	return __zh.admin_publish_post(inputs)
});
/**
* | output |
* | --- |
* | "Save draft" |
*
* @param {Admin_Save_DraftInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_save_draft = /** @type {((inputs?: Admin_Save_DraftInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Save_DraftInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_save_draft(inputs)
	return __zh.admin_save_draft(inputs)
});
/**
* | output |
* | --- |
* | "Schedule" |
*
* @param {Admin_Schedule_PostInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_schedule_post = /** @type {((inputs?: Admin_Schedule_PostInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Schedule_PostInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_schedule_post(inputs)
	return __zh.admin_schedule_post(inputs)
});
/**
* | output |
* | --- |
* | "Save settings" |
*
* @param {Admin_Save_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_save_settings = /** @type {((inputs?: Admin_Save_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Save_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_save_settings(inputs)
	return __zh.admin_save_settings(inputs)
});
/**
* | output |
* | --- |
* | "Cancel" |
*
* @param {Admin_Series_CancelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_cancel = /** @type {((inputs?: Admin_Series_CancelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_CancelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_cancel(inputs)
	return __zh.admin_series_cancel(inputs)
});
/**
* | output |
* | --- |
* | "Series are curated article collections. A post can belong to one series, while tags can still mark multiple topics." |
*
* @param {Admin_Series_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_description = /** @type {((inputs?: Admin_Series_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_description(inputs)
	return __zh.admin_series_description(inputs)
});
/**
* | output |
* | --- |
* | "Series could not be saved." |
*
* @param {Admin_Series_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_error = /** @type {((inputs?: Admin_Series_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_error(inputs)
	return __zh.admin_series_error(inputs)
});
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Admin_Series_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_name = /** @type {((inputs?: Admin_Series_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_name(inputs)
	return __zh.admin_series_name(inputs)
});
/**
* | output |
* | --- |
* | "New series" |
*
* @param {Admin_Series_NewInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_new = /** @type {((inputs?: Admin_Series_NewInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_NewInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_new(inputs)
	return __zh.admin_series_new(inputs)
});
/**
* | output |
* | --- |
* | "Save series" |
*
* @param {Admin_Series_SaveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_save = /** @type {((inputs?: Admin_Series_SaveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_SaveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_save(inputs)
	return __zh.admin_series_save(inputs)
});
/**
* | output |
* | --- |
* | "Series saved." |
*
* @param {Admin_Series_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_saved = /** @type {((inputs?: Admin_Series_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_saved(inputs)
	return __zh.admin_series_saved(inputs)
});
/**
* | output |
* | --- |
* | "Slug" |
*
* @param {Admin_Series_SlugInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_slug = /** @type {((inputs?: Admin_Series_SlugInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_SlugInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_slug(inputs)
	return __zh.admin_series_slug(inputs)
});
/**
* | output |
* | --- |
* | "Sort order" |
*
* @param {Admin_Series_Sort_OrderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_sort_order = /** @type {((inputs?: Admin_Series_Sort_OrderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_Sort_OrderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_sort_order(inputs)
	return __zh.admin_series_sort_order(inputs)
});
/**
* | output |
* | --- |
* | "Description" |
*
* @param {Admin_Series_SummaryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_summary = /** @type {((inputs?: Admin_Series_SummaryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_SummaryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_summary(inputs)
	return __zh.admin_series_summary(inputs)
});
/**
* | output |
* | --- |
* | "Series" |
*
* @param {Admin_Series_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_series_title = /** @type {((inputs?: Admin_Series_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Series_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_series_title(inputs)
	return __zh.admin_series_title(inputs)
});
/**
* | output |
* | --- |
* | "Import and export" |
*
* @param {Admin_Import_Export_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_export_title = /** @type {((inputs?: Admin_Import_Export_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_Export_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_export_title(inputs)
	return __zh.admin_import_export_title(inputs)
});
/**
* | output |
* | --- |
* | "Move content in and out of the blog without leaving the admin area." |
*
* @param {Admin_Import_Export_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_export_description = /** @type {((inputs?: Admin_Import_Export_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_Export_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_export_description(inputs)
	return __zh.admin_import_export_description(inputs)
});
/**
* | output |
* | --- |
* | "Export" |
*
* @param {Admin_Export_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_export_title = /** @type {((inputs?: Admin_Export_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Export_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_export_title(inputs)
	return __zh.admin_export_title(inputs)
});
/**
* | output |
* | --- |
* | "Download JSON" |
*
* @param {Admin_Export_JsonInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_export_json = /** @type {((inputs?: Admin_Export_JsonInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Export_JsonInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_export_json(inputs)
	return __zh.admin_export_json(inputs)
});
/**
* | output |
* | --- |
* | "Download ZIP" |
*
* @param {Admin_Export_ZipInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_export_zip = /** @type {((inputs?: Admin_Export_ZipInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Export_ZipInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_export_zip(inputs)
	return __zh.admin_export_zip(inputs)
});
/**
* | output |
* | --- |
* | "Export download started." |
*
* @param {Admin_Export_StartedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_export_started = /** @type {((inputs?: Admin_Export_StartedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Export_StartedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_export_started(inputs)
	return __zh.admin_export_started(inputs)
});
/**
* | output |
* | --- |
* | "Export could not be created." |
*
* @param {Admin_Export_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_export_error = /** @type {((inputs?: Admin_Export_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Export_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_export_error(inputs)
	return __zh.admin_export_error(inputs)
});
/**
* | output |
* | --- |
* | "Create backup" |
*
* @param {Admin_Create_BackupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_create_backup = /** @type {((inputs?: Admin_Create_BackupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Create_BackupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_create_backup(inputs)
	return __zh.admin_create_backup(inputs)
});
/**
* | output |
* | --- |
* | "Backup created." |
*
* @param {Admin_Backup_CreatedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_backup_created = /** @type {((inputs?: Admin_Backup_CreatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Backup_CreatedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_backup_created(inputs)
	return __zh.admin_backup_created(inputs)
});
/**
* | output |
* | --- |
* | "Backup could not be created." |
*
* @param {Admin_Backup_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_backup_error = /** @type {((inputs?: Admin_Backup_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Backup_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_backup_error(inputs)
	return __zh.admin_backup_error(inputs)
});
/**
* | output |
* | --- |
* | "Import" |
*
* @param {Admin_Import_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_title = /** @type {((inputs?: Admin_Import_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_title(inputs)
	return __zh.admin_import_title(inputs)
});
/**
* | output |
* | --- |
* | "Import file" |
*
* @param {Admin_Import_FileInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_file = /** @type {((inputs?: Admin_Import_FileInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_FileInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_file(inputs)
	return __zh.admin_import_file(inputs)
});
/**
* | output |
* | --- |
* | "Import as" |
*
* @param {Admin_Import_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_status = /** @type {((inputs?: Admin_Import_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_status(inputs)
	return __zh.admin_import_status(inputs)
});
/**
* | output |
* | --- |
* | "Import content" |
*
* @param {Admin_Import_SubmitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_submit = /** @type {((inputs?: Admin_Import_SubmitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_SubmitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_submit(inputs)
	return __zh.admin_import_submit(inputs)
});
/**
* | output |
* | --- |
* | "Imported {title}." |
*
* @param {Admin_Import_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_success = /** @type {((inputs: Admin_Import_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_success(inputs)
	return __zh.admin_import_success(inputs)
});
/**
* | output |
* | --- |
* | "Import failed." |
*
* @param {Admin_Import_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_import_error = /** @type {((inputs?: Admin_Import_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Import_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_import_error(inputs)
	return __zh.admin_import_error(inputs)
});
/**
* | output |
* | --- |
* | "Email accounts" |
*
* @param {Admin_Email_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_email_settings = /** @type {((inputs?: Admin_Email_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Email_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_email_settings(inputs)
	return __zh.admin_email_settings(inputs)
});
/**
* | output |
* | --- |
* | "Require email verification" |
*
* @param {Admin_Email_VerificationInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_email_verification = /** @type {((inputs?: Admin_Email_VerificationInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Email_VerificationInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_email_verification(inputs)
	return __zh.admin_email_verification(inputs)
});
/**
* | output |
* | --- |
* | "New email/password comment accounts must verify their email before signing in. Configure Cloudflare Email Sending or Resend first." |
*
* @param {Admin_Email_Verification_HelpInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_email_verification_help = /** @type {((inputs?: Admin_Email_Verification_HelpInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Email_Verification_HelpInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_email_verification_help(inputs)
	return __zh.admin_email_verification_help(inputs)
});
/**
* | output |
* | --- |
* | "Email provider detected: {provider}." |
*
* @param {Admin_Email_Verification_ProviderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_email_verification_provider = /** @type {((inputs: Admin_Email_Verification_ProviderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Email_Verification_ProviderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_email_verification_provider(inputs)
	return __zh.admin_email_verification_provider(inputs)
});
/**
* | output |
* | --- |
* | "Configure Cloudflare Email Sending or Resend environment variables before enabling email verification." |
*
* @param {Admin_Email_Verification_UnavailableInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_email_verification_unavailable = /** @type {((inputs?: Admin_Email_Verification_UnavailableInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Email_Verification_UnavailableInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_email_verification_unavailable(inputs)
	return __zh.admin_email_verification_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "Author bio" |
*
* @param {Admin_Settings_Author_BioInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_author_bio = /** @type {((inputs?: Admin_Settings_Author_BioInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Author_BioInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_author_bio(inputs)
	return __zh.admin_settings_author_bio(inputs)
});
/**
* | output |
* | --- |
* | "Author name" |
*
* @param {Admin_Settings_Author_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_author_name = /** @type {((inputs?: Admin_Settings_Author_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Author_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_author_name(inputs)
	return __zh.admin_settings_author_name(inputs)
});
/**
* | output |
* | --- |
* | "Avatar URL" |
*
* @param {Admin_Settings_Avatar_UrlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_avatar_url = /** @type {((inputs?: Admin_Settings_Avatar_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Avatar_UrlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_avatar_url(inputs)
	return __zh.admin_settings_avatar_url(inputs)
});
/**
* | output |
* | --- |
* | "Default OG image" |
*
* @param {Admin_Settings_Default_OgInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_default_og = /** @type {((inputs?: Admin_Settings_Default_OgInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Default_OgInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_default_og(inputs)
	return __zh.admin_settings_default_og(inputs)
});
/**
* | output |
* | --- |
* | "Description" |
*
* @param {Admin_Settings_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_description = /** @type {((inputs?: Admin_Settings_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_description(inputs)
	return __zh.admin_settings_description(inputs)
});
/**
* | output |
* | --- |
* | "Settings could not be saved." |
*
* @param {Admin_Settings_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_error = /** @type {((inputs?: Admin_Settings_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_error(inputs)
	return __zh.admin_settings_error(inputs)
});
/**
* | output |
* | --- |
* | "Basic identity, SEO, RSS, and primary language configuration." |
*
* @param {Admin_Settings_HelpInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_help = /** @type {((inputs?: Admin_Settings_HelpInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_HelpInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_help(inputs)
	return __zh.admin_settings_help(inputs)
});
/**
* | output |
* | --- |
* | "Identity" |
*
* @param {Admin_Settings_IdentityInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_identity = /** @type {((inputs?: Admin_Settings_IdentityInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_IdentityInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_identity(inputs)
	return __zh.admin_settings_identity(inputs)
});
/**
* | output |
* | --- |
* | "Allow search indexing" |
*
* @param {Admin_Settings_IndexingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_indexing = /** @type {((inputs?: Admin_Settings_IndexingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_IndexingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_indexing(inputs)
	return __zh.admin_settings_indexing(inputs)
});
/**
* | output |
* | --- |
* | "Primary language" |
*
* @param {Admin_Settings_LanguageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_language = /** @type {((inputs?: Admin_Settings_LanguageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_LanguageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_language(inputs)
	return __zh.admin_settings_language(inputs)
});
/**
* | output |
* | --- |
* | "Homepage layout" |
*
* @param {Admin_Settings_Layout_PresetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_layout_preset = /** @type {((inputs?: Admin_Settings_Layout_PresetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Layout_PresetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_layout_preset(inputs)
	return __zh.admin_settings_layout_preset(inputs)
});
/**
* | output |
* | --- |
* | "Links" |
*
* @param {Admin_Settings_LinksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_links = /** @type {((inputs?: Admin_Settings_LinksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_LinksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_links(inputs)
	return __zh.admin_settings_links(inputs)
});
/**
* | output |
* | --- |
* | "Navigation links" |
*
* @param {Admin_Settings_Navigation_LinksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_navigation_links = /** @type {((inputs?: Admin_Settings_Navigation_LinksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Navigation_LinksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_navigation_links(inputs)
	return __zh.admin_settings_navigation_links(inputs)
});
/**
* | output |
* | --- |
* | "Enable RSS feed" |
*
* @param {Admin_Settings_RssInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_rss = /** @type {((inputs?: Admin_Settings_RssInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_RssInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_rss(inputs)
	return __zh.admin_settings_rss(inputs)
});
/**
* | output |
* | --- |
* | "Settings saved." |
*
* @param {Admin_Settings_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_saved = /** @type {((inputs?: Admin_Settings_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_saved(inputs)
	return __zh.admin_settings_saved(inputs)
});
/**
* | output |
* | --- |
* | "Site name" |
*
* @param {Admin_Settings_Site_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_site_name = /** @type {((inputs?: Admin_Settings_Site_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Site_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_site_name(inputs)
	return __zh.admin_settings_site_name(inputs)
});
/**
* | output |
* | --- |
* | "Site URL" |
*
* @param {Admin_Settings_Site_UrlInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_site_url = /** @type {((inputs?: Admin_Settings_Site_UrlInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Site_UrlInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_site_url(inputs)
	return __zh.admin_settings_site_url(inputs)
});
/**
* | output |
* | --- |
* | "Social links" |
*
* @param {Admin_Settings_Social_LinksInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_social_links = /** @type {((inputs?: Admin_Settings_Social_LinksInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Social_LinksInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_social_links(inputs)
	return __zh.admin_settings_social_links(inputs)
});
/**
* | output |
* | --- |
* | "Theme preset" |
*
* @param {Admin_Settings_Theme_PresetInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_theme_preset = /** @type {((inputs?: Admin_Settings_Theme_PresetInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_Theme_PresetInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_theme_preset(inputs)
	return __zh.admin_settings_theme_preset(inputs)
});
/**
* | output |
* | --- |
* | "Site settings" |
*
* @param {Admin_Settings_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_settings_title = /** @type {((inputs?: Admin_Settings_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Settings_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_settings_title(inputs)
	return __zh.admin_settings_title(inputs)
});
/**
* | output |
* | --- |
* | "Storage contract" |
*
* @param {Admin_Storage_ContractInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_storage_contract = /** @type {((inputs?: Admin_Storage_ContractInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Storage_ContractInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_storage_contract(inputs)
	return __zh.admin_storage_contract(inputs)
});
/**
* | output |
* | --- |
* | "D1 owns structured records. R2 owns images, imports, exports, and backups." |
*
* @param {Admin_Storage_Contract_DetailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_storage_contract_detail = /** @type {((inputs?: Admin_Storage_Contract_DetailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Storage_Contract_DetailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_storage_contract_detail(inputs)
	return __zh.admin_storage_contract_detail(inputs)
});
/**
* | output |
* | --- |
* | "Create token" |
*
* @param {Admin_Create_TokenInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_create_token = /** @type {((inputs?: Admin_Create_TokenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Create_TokenInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_create_token(inputs)
	return __zh.admin_create_token(inputs)
});
/**
* | output |
* | --- |
* | "Revoke" |
*
* @param {Admin_Revoke_TokenInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_revoke_token = /** @type {((inputs?: Admin_Revoke_TokenInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Revoke_TokenInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_revoke_token(inputs)
	return __zh.admin_revoke_token(inputs)
});
/**
* | output |
* | --- |
* | "Token name" |
*
* @param {Admin_Token_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_token_name = /** @type {((inputs?: Admin_Token_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_token_name(inputs)
	return __zh.admin_token_name(inputs)
});
/**
* | output |
* | --- |
* | "Revoked" |
*
* @param {Admin_Token_RevokedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_token_revoked = /** @type {((inputs?: Admin_Token_RevokedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_RevokedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_token_revoked(inputs)
	return __zh.admin_token_revoked(inputs)
});
/**
* | output |
* | --- |
* | "Token scopes" |
*
* @param {Admin_Token_ScopesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_token_scopes = /** @type {((inputs?: Admin_Token_ScopesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_ScopesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_token_scopes(inputs)
	return __zh.admin_token_scopes(inputs)
});
/**
* | output |
* | --- |
* | "Token secret" |
*
* @param {Admin_Token_Secret_OnceInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_token_secret_once = /** @type {((inputs?: Admin_Token_Secret_OnceInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Token_Secret_OnceInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_token_secret_once(inputs)
	return __zh.admin_token_secret_once(inputs)
});
/**
* | output |
* | --- |
* | "Create scoped automation tokens for OpenAPI and AI publishing workflows." |
*
* @param {Admin_Tokens_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_tokens_description = /** @type {((inputs?: Admin_Tokens_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Tokens_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_tokens_description(inputs)
	return __zh.admin_tokens_description(inputs)
});
/**
* | output |
* | --- |
* | "API tokens" |
*
* @param {Admin_Tokens_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_tokens_title = /** @type {((inputs?: Admin_Tokens_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Tokens_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_tokens_title(inputs)
	return __zh.admin_tokens_title(inputs)
});
/**
* | output |
* | --- |
* | "Comments" |
*
* @param {Admin_Users_CommentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_comments = /** @type {((inputs?: Admin_Users_CommentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_CommentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_comments(inputs)
	return __zh.admin_users_comments(inputs)
});
/**
* | output |
* | --- |
* | "{count} comments" |
*
* @param {Admin_Users_Comments_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_comments_count = /** @type {((inputs: Admin_Users_Comments_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Comments_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_comments_count(inputs)
	return __zh.admin_users_comments_count(inputs)
});
/**
* | output |
* | --- |
* | "Manage reader accounts that can comment, plus admin accounts." |
*
* @param {Admin_Users_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_description = /** @type {((inputs?: Admin_Users_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_description(inputs)
	return __zh.admin_users_description(inputs)
});
/**
* | output |
* | --- |
* | "Email unverified" |
*
* @param {Admin_Users_Email_UnverifiedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_email_unverified = /** @type {((inputs?: Admin_Users_Email_UnverifiedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Email_UnverifiedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_email_unverified(inputs)
	return __zh.admin_users_email_unverified(inputs)
});
/**
* | output |
* | --- |
* | "Email verified" |
*
* @param {Admin_Users_Email_VerifiedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_email_verified = /** @type {((inputs?: Admin_Users_Email_VerifiedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Email_VerifiedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_email_verified(inputs)
	return __zh.admin_users_email_verified(inputs)
});
/**
* | output |
* | --- |
* | "No users match the current filters." |
*
* @param {Admin_Users_EmptyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_empty = /** @type {((inputs?: Admin_Users_EmptyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_EmptyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_empty(inputs)
	return __zh.admin_users_empty(inputs)
});
/**
* | output |
* | --- |
* | "User could not be updated." |
*
* @param {Admin_Users_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_error = /** @type {((inputs?: Admin_Users_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_error(inputs)
	return __zh.admin_users_error(inputs)
});
/**
* | output |
* | --- |
* | "Filter by role" |
*
* @param {Admin_Users_Filter_RoleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_filter_role = /** @type {((inputs?: Admin_Users_Filter_RoleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Filter_RoleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_filter_role(inputs)
	return __zh.admin_users_filter_role(inputs)
});
/**
* | output |
* | --- |
* | "Filter by comment access" |
*
* @param {Admin_Users_Filter_StatusInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_filter_status = /** @type {((inputs?: Admin_Users_Filter_StatusInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Filter_StatusInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_filter_status(inputs)
	return __zh.admin_users_filter_status(inputs)
});
/**
* | output |
* | --- |
* | "Joined {date}" |
*
* @param {Admin_Users_JoinedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_joined = /** @type {((inputs: Admin_Users_JoinedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_JoinedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_joined(inputs)
	return __zh.admin_users_joined(inputs)
});
/**
* | output |
* | --- |
* | "Last comment" |
*
* @param {Admin_Users_Last_CommentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_last_comment = /** @type {((inputs?: Admin_Users_Last_CommentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Last_CommentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_last_comment(inputs)
	return __zh.admin_users_last_comment(inputs)
});
/**
* | output |
* | --- |
* | "Mute comments" |
*
* @param {Admin_Users_MuteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_mute = /** @type {((inputs?: Admin_Users_MuteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_MuteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_mute(inputs)
	return __zh.admin_users_mute(inputs)
});
/**
* | output |
* | --- |
* | "No comments" |
*
* @param {Admin_Users_No_CommentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_no_comments = /** @type {((inputs?: Admin_Users_No_CommentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_No_CommentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_no_comments(inputs)
	return __zh.admin_users_no_comments(inputs)
});
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Admin_Users_Provider_EmailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_provider_email = /** @type {((inputs?: Admin_Users_Provider_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Provider_EmailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_provider_email(inputs)
	return __zh.admin_users_provider_email(inputs)
});
/**
* | output |
* | --- |
* | "Unknown provider" |
*
* @param {Admin_Users_Provider_UnknownInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_provider_unknown = /** @type {((inputs?: Admin_Users_Provider_UnknownInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Provider_UnknownInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_provider_unknown(inputs)
	return __zh.admin_users_provider_unknown(inputs)
});
/**
* | output |
* | --- |
* | "Admin" |
*
* @param {Admin_Users_Role_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_role_admin = /** @type {((inputs?: Admin_Users_Role_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Role_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_role_admin(inputs)
	return __zh.admin_users_role_admin(inputs)
});
/**
* | output |
* | --- |
* | "All roles" |
*
* @param {Admin_Users_Role_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_role_all = /** @type {((inputs?: Admin_Users_Role_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Role_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_role_all(inputs)
	return __zh.admin_users_role_all(inputs)
});
/**
* | output |
* | --- |
* | "Reader" |
*
* @param {Admin_Users_Role_ReaderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_role_reader = /** @type {((inputs?: Admin_Users_Role_ReaderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Role_ReaderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_role_reader(inputs)
	return __zh.admin_users_role_reader(inputs)
});
/**
* | output |
* | --- |
* | "User updated." |
*
* @param {Admin_Users_SavedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_saved = /** @type {((inputs?: Admin_Users_SavedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_SavedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_saved(inputs)
	return __zh.admin_users_saved(inputs)
});
/**
* | output |
* | --- |
* | "Search users" |
*
* @param {Admin_Users_SearchInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_search = /** @type {((inputs?: Admin_Users_SearchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_SearchInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_search(inputs)
	return __zh.admin_users_search(inputs)
});
/**
* | output |
* | --- |
* | "Name, email, or provider" |
*
* @param {Admin_Users_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_search_placeholder = /** @type {((inputs?: Admin_Users_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_search_placeholder(inputs)
	return __zh.admin_users_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Can comment" |
*
* @param {Admin_Users_Status_ActiveInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_status_active = /** @type {((inputs?: Admin_Users_Status_ActiveInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Status_ActiveInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_status_active(inputs)
	return __zh.admin_users_status_active(inputs)
});
/**
* | output |
* | --- |
* | "All comment access" |
*
* @param {Admin_Users_Status_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_status_all = /** @type {((inputs?: Admin_Users_Status_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Status_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_status_all(inputs)
	return __zh.admin_users_status_all(inputs)
});
/**
* | output |
* | --- |
* | "Muted" |
*
* @param {Admin_Users_Status_MutedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_status_muted = /** @type {((inputs?: Admin_Users_Status_MutedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Status_MutedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_status_muted(inputs)
	return __zh.admin_users_status_muted(inputs)
});
/**
* | output |
* | --- |
* | "Never changed" |
*
* @param {Admin_Users_Status_Not_ChangedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_status_not_changed = /** @type {((inputs?: Admin_Users_Status_Not_ChangedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Status_Not_ChangedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_status_not_changed(inputs)
	return __zh.admin_users_status_not_changed(inputs)
});
/**
* | output |
* | --- |
* | "Access updated" |
*
* @param {Admin_Users_Status_UpdatedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_status_updated = /** @type {((inputs?: Admin_Users_Status_UpdatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_Status_UpdatedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_status_updated(inputs)
	return __zh.admin_users_status_updated(inputs)
});
/**
* | output |
* | --- |
* | "Users" |
*
* @param {Admin_Users_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_title = /** @type {((inputs?: Admin_Users_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_title(inputs)
	return __zh.admin_users_title(inputs)
});
/**
* | output |
* | --- |
* | "Total users" |
*
* @param {Admin_Users_TotalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_total = /** @type {((inputs?: Admin_Users_TotalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_TotalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_total(inputs)
	return __zh.admin_users_total(inputs)
});
/**
* | output |
* | --- |
* | "Restore comments" |
*
* @param {Admin_Users_UnmuteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const admin_users_unmute = /** @type {((inputs?: Admin_Users_UnmuteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Admin_Users_UnmuteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.admin_users_unmute(inputs)
	return __zh.admin_users_unmute(inputs)
});
/**
* | output |
* | --- |
* | "Manage your comments and email preferences." |
*
* @param {Account_Management_NoteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const account_management_note = /** @type {((inputs?: Account_Management_NoteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Management_NoteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.account_management_note(inputs)
	return __zh.account_management_note(inputs)
});
/**
* | output |
* | --- |
* | "Signed in as" |
*
* @param {Account_Signed_In_AsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const account_signed_in_as = /** @type {((inputs?: Account_Signed_In_AsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_Signed_In_AsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.account_signed_in_as(inputs)
	return __zh.account_signed_in_as(inputs)
});
/**
* | output |
* | --- |
* | "Account" |
*
* @param {Account_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const account_title = /** @type {((inputs?: Account_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Account_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.account_title(inputs)
	return __zh.account_title(inputs)
});
/**
* | output |
* | --- |
* | "Use scoped API tokens for publishing, imports, exports, assets, and comment moderation." |
*
* @param {Api_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_description = /** @type {((inputs?: Api_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_description(inputs)
	return __zh.api_description(inputs)
});
/**
* | output |
* | --- |
* | "API" |
*
* @param {Api_EyebrowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_eyebrow = /** @type {((inputs?: Api_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_eyebrow(inputs)
	return __zh.api_eyebrow(inputs)
});
/**
* | output |
* | --- |
* | "Manage settings" |
*
* @param {Api_Manage_SettingsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_manage_settings = /** @type {((inputs?: Api_Manage_SettingsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_Manage_SettingsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_manage_settings(inputs)
	return __zh.api_manage_settings(inputs)
});
/**
* | output |
* | --- |
* | "Method" |
*
* @param {Api_MethodInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_method = /** @type {((inputs?: Api_MethodInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_MethodInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_method(inputs)
	return __zh.api_method(inputs)
});
/**
* | output |
* | --- |
* | "Open OpenAPI JSON" |
*
* @param {Api_Open_OpenapiInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_open_openapi = /** @type {((inputs?: Api_Open_OpenapiInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_Open_OpenapiInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_open_openapi(inputs)
	return __zh.api_open_openapi(inputs)
});
/**
* | output |
* | --- |
* | "Path" |
*
* @param {Api_PathInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_path = /** @type {((inputs?: Api_PathInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_PathInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_path(inputs)
	return __zh.api_path(inputs)
});
/**
* | output |
* | --- |
* | "Scope" |
*
* @param {Api_ScopeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_scope = /** @type {((inputs?: Api_ScopeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_ScopeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_scope(inputs)
	return __zh.api_scope(inputs)
});
/**
* | output |
* | --- |
* | "OpenAPI and automation endpoints" |
*
* @param {Api_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_title = /** @type {((inputs?: Api_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_title(inputs)
	return __zh.api_title(inputs)
});
/**
* | output |
* | --- |
* | "Token scopes" |
*
* @param {Api_Token_ScopesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const api_token_scopes = /** @type {((inputs?: Api_Token_ScopesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Api_Token_ScopesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.api_token_scopes(inputs)
	return __zh.api_token_scopes(inputs)
});
/**
* | output |
* | --- |
* | "Back to home" |
*
* @param {Back_HomeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const back_home = /** @type {((inputs?: Back_HomeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Back_HomeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.back_home(inputs)
	return __zh.back_home(inputs)
});
/**
* | output |
* | --- |
* | "Articles about the 01MVP blog template, Cloudflare-native storage, Markdown publishing, and automation workflows." |
*
* @param {Blog_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_description = /** @type {((inputs?: Blog_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_description(inputs)
	return __zh.blog_description(inputs)
});
/**
* | output |
* | --- |
* | "Blog" |
*
* @param {Blog_EyebrowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_eyebrow = /** @type {((inputs?: Blog_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_eyebrow(inputs)
	return __zh.blog_eyebrow(inputs)
});
/**
* | output |
* | --- |
* | "All" |
*
* @param {Blog_Filter_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_filter_all = /** @type {((inputs?: Blog_Filter_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Filter_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_filter_all(inputs)
	return __zh.blog_filter_all(inputs)
});
/**
* | output |
* | --- |
* | "Filter posts by tag" |
*
* @param {Blog_Filter_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_filter_label = /** @type {((inputs?: Blog_Filter_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Filter_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_filter_label(inputs)
	return __zh.blog_filter_label(inputs)
});
/**
* | output |
* | --- |
* | "No posts matched this search." |
*
* @param {Blog_No_ResultsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_no_results = /** @type {((inputs?: Blog_No_ResultsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_No_ResultsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_no_results(inputs)
	return __zh.blog_no_results(inputs)
});
/**
* | output |
* | --- |
* | "Search posts" |
*
* @param {Blog_Search_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_search_placeholder = /** @type {((inputs?: Blog_Search_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Search_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_search_placeholder(inputs)
	return __zh.blog_search_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Search" |
*
* @param {Blog_Search_SubmitInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_search_submit = /** @type {((inputs?: Blog_Search_SubmitInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Search_SubmitInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_search_submit(inputs)
	return __zh.blog_search_submit(inputs)
});
/**
* | output |
* | --- |
* | "All series" |
*
* @param {Blog_Series_AllInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_series_all = /** @type {((inputs?: Blog_Series_AllInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Series_AllInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_series_all(inputs)
	return __zh.blog_series_all(inputs)
});
/**
* | output |
* | --- |
* | "Filter posts by series" |
*
* @param {Blog_Series_Filter_LabelInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_series_filter_label = /** @type {((inputs?: Blog_Series_Filter_LabelInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_Series_Filter_LabelInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_series_filter_label(inputs)
	return __zh.blog_series_filter_label(inputs)
});
/**
* | output |
* | --- |
* | "Durable publishing notes" |
*
* @param {Blog_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const blog_title = /** @type {((inputs?: Blog_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Blog_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.blog_title(inputs)
	return __zh.blog_title(inputs)
});
/**
* | output |
* | --- |
* | "Comment" |
*
* @param {Comment_BodyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_body = /** @type {((inputs?: Comment_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_BodyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_body(inputs)
	return __zh.comment_body(inputs)
});
/**
* | output |
* | --- |
* | "Company" |
*
* @param {Comment_CompanyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_company = /** @type {((inputs?: Comment_CompanyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_CompanyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_company(inputs)
	return __zh.comment_company(inputs)
});
/**
* | output |
* | --- |
* | "Comment login failed." |
*
* @param {Comment_Auth_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_auth_error = /** @type {((inputs?: Comment_Auth_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Auth_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_auth_error(inputs)
	return __zh.comment_auth_error(inputs)
});
/**
* | output |
* | --- |
* | "Checking comment login..." |
*
* @param {Comment_Auth_LoadingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_auth_loading = /** @type {((inputs?: Comment_Auth_LoadingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Auth_LoadingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_auth_loading(inputs)
	return __zh.comment_auth_loading(inputs)
});
/**
* | output |
* | --- |
* | "Commenting is muted for this account" |
*
* @param {Comment_Account_MutedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_account_muted = /** @type {((inputs?: Comment_Account_MutedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Account_MutedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_account_muted(inputs)
	return __zh.comment_account_muted(inputs)
});
/**
* | output |
* | --- |
* | "This account can still read the site, but it cannot post new comments." |
*
* @param {Comment_Account_Muted_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_account_muted_description = /** @type {((inputs?: Comment_Account_Muted_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Account_Muted_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_account_muted_description(inputs)
	return __zh.comment_account_muted_description(inputs)
});
/**
* | output |
* | --- |
* | "Continue with GitHub" |
*
* @param {Comment_Continue_GithubInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_continue_github = /** @type {((inputs?: Comment_Continue_GithubInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Continue_GithubInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_continue_github(inputs)
	return __zh.comment_continue_github(inputs)
});
/**
* | output |
* | --- |
* | "Continue with Google" |
*
* @param {Comment_Continue_GoogleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_continue_google = /** @type {((inputs?: Comment_Continue_GoogleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Continue_GoogleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_continue_google(inputs)
	return __zh.comment_continue_google(inputs)
});
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Comment_EmailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_email = /** @type {((inputs?: Comment_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_EmailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_email(inputs)
	return __zh.comment_email(inputs)
});
/**
* | output |
* | --- |
* | "Verification email sent. Check your inbox before signing in." |
*
* @param {Comment_Email_Verification_SentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_email_verification_sent = /** @type {((inputs?: Comment_Email_Verification_SentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Email_Verification_SentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_email_verification_sent(inputs)
	return __zh.comment_email_verification_sent(inputs)
});
/**
* | output |
* | --- |
* | "Comment could not be submitted." |
*
* @param {Comment_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_error = /** @type {((inputs?: Comment_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_error(inputs)
	return __zh.comment_error(inputs)
});
/**
* | output |
* | --- |
* | "Sign in with GitHub, Google, or email before posting a comment." |
*
* @param {Comment_Login_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_login_description = /** @type {((inputs?: Comment_Login_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Login_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_login_description(inputs)
	return __zh.comment_login_description(inputs)
});
/**
* | output |
* | --- |
* | "Login required to comment" |
*
* @param {Comment_Login_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_login_required = /** @type {((inputs?: Comment_Login_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Login_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_login_required(inputs)
	return __zh.comment_login_required(inputs)
});
/**
* | output |
* | --- |
* | "Name" |
*
* @param {Comment_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_name = /** @type {((inputs?: Comment_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_name(inputs)
	return __zh.comment_name(inputs)
});
/**
* | output |
* | --- |
* | "Cancel reply" |
*
* @param {Comment_Cancel_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_cancel_reply = /** @type {((inputs?: Comment_Cancel_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Cancel_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_cancel_reply(inputs)
	return __zh.comment_cancel_reply(inputs)
});
/**
* | output |
* | --- |
* | "Reply" |
*
* @param {Comment_ReplyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_reply = /** @type {((inputs?: Comment_ReplyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_ReplyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_reply(inputs)
	return __zh.comment_reply(inputs)
});
/**
* | output |
* | --- |
* | "Replying to {name}" |
*
* @param {Comment_Replying_ToInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_replying_to = /** @type {((inputs: Comment_Replying_ToInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Replying_ToInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_replying_to(inputs)
	return __zh.comment_replying_to(inputs)
});
/**
* | output |
* | --- |
* | "Commenting as {name}" |
*
* @param {Comment_Signed_In_AsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_signed_in_as = /** @type {((inputs: Comment_Signed_In_AsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Signed_In_AsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_signed_in_as(inputs)
	return __zh.comment_signed_in_as(inputs)
});
/**
* | output |
* | --- |
* | "Submitting..." |
*
* @param {Comment_SubmittingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_submitting = /** @type {((inputs?: Comment_SubmittingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_SubmittingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_submitting(inputs)
	return __zh.comment_submitting(inputs)
});
/**
* | output |
* | --- |
* | "Pending" |
*
* @param {Comment_Pending_BadgeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_pending_badge = /** @type {((inputs?: Comment_Pending_BadgeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Pending_BadgeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_pending_badge(inputs)
	return __zh.comment_pending_badge(inputs)
});
/**
* | output |
* | --- |
* | "Comment received. It will appear after review." |
*
* @param {Comment_Pending_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_pending_success = /** @type {((inputs?: Comment_Pending_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Pending_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_pending_success(inputs)
	return __zh.comment_pending_success(inputs)
});
/**
* | output |
* | --- |
* | "Only you can see this comment for now. It will appear publicly after review." |
*
* @param {Comment_Pending_Visible_NoteInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_pending_visible_note = /** @type {((inputs?: Comment_Pending_Visible_NoteInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Pending_Visible_NoteInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_pending_visible_note(inputs)
	return __zh.comment_pending_visible_note(inputs)
});
/**
* | output |
* | --- |
* | "Comment published." |
*
* @param {Comment_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_success = /** @type {((inputs?: Comment_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_success(inputs)
	return __zh.comment_success(inputs)
});
/**
* | output |
* | --- |
* | "Use existing account" |
*
* @param {Comment_Switch_To_LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_switch_to_login = /** @type {((inputs?: Comment_Switch_To_LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Switch_To_LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_switch_to_login(inputs)
	return __zh.comment_switch_to_login(inputs)
});
/**
* | output |
* | --- |
* | "Create email account" |
*
* @param {Comment_Switch_To_SignupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comment_switch_to_signup = /** @type {((inputs?: Comment_Switch_To_SignupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comment_Switch_To_SignupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comment_switch_to_signup(inputs)
	return __zh.comment_switch_to_signup(inputs)
});
/**
* | output |
* | --- |
* | "Comments" |
*
* @param {CommentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comments = /** @type {((inputs?: CommentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<CommentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comments(inputs)
	return __zh.comments(inputs)
});
/**
* | output |
* | --- |
* | "Comments appear after approval." |
*
* @param {Comments_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comments_description = /** @type {((inputs?: Comments_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comments_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comments_description(inputs)
	return __zh.comments_description(inputs)
});
/**
* | output |
* | --- |
* | "Comments are closed for this post." |
*
* @param {Comments_DisabledInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const comments_disabled = /** @type {((inputs?: Comments_DisabledInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Comments_DisabledInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.comments_disabled(inputs)
	return __zh.comments_disabled(inputs)
});
/**
* | output |
* | --- |
* | "Contents" |
*
* @param {ContentsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const contents = /** @type {((inputs?: ContentsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<ContentsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.contents(inputs)
	return __zh.contents(inputs)
});
/**
* | output |
* | --- |
* | "OpenAPI" |
*
* @param {Feature_Api_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feature_api_title = /** @type {((inputs?: Feature_Api_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Api_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feature_api_title(inputs)
	return __zh.feature_api_title(inputs)
});
/**
* | output |
* | --- |
* | "Automation surfaces for developers and publishing tools." |
*
* @param {Feature_Api_BodyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feature_api_body = /** @type {((inputs?: Feature_Api_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Api_BodyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feature_api_body(inputs)
	return __zh.feature_api_body(inputs)
});
/**
* | output |
* | --- |
* | "Posts, comments, settings, users, and API tokens." |
*
* @param {Feature_D1_BodyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feature_d1_body = /** @type {((inputs?: Feature_D1_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_D1_BodyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feature_d1_body(inputs)
	return __zh.feature_d1_body(inputs)
});
/**
* | output |
* | --- |
* | "Moderation" |
*
* @param {Feature_Moderation_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feature_moderation_title = /** @type {((inputs?: Feature_Moderation_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Moderation_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feature_moderation_title(inputs)
	return __zh.feature_moderation_title(inputs)
});
/**
* | output |
* | --- |
* | "Pending comments, Turnstile, rate limits, and spam review." |
*
* @param {Feature_Moderation_BodyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feature_moderation_body = /** @type {((inputs?: Feature_Moderation_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Moderation_BodyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feature_moderation_body(inputs)
	return __zh.feature_moderation_body(inputs)
});
/**
* | output |
* | --- |
* | "Images, imports, exports, attachments, and backups." |
*
* @param {Feature_R2_BodyInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const feature_r2_body = /** @type {((inputs?: Feature_R2_BodyInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_R2_BodyInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.feature_r2_body(inputs)
	return __zh.feature_r2_body(inputs)
});
/**
* | output |
* | --- |
* | "Featured" |
*
* @param {FeaturedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const featured = /** @type {((inputs?: FeaturedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<FeaturedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.featured(inputs)
	return __zh.featured(inputs)
});
/**
* | output |
* | --- |
* | "GitHub repository" |
*
* @param {Github_RepositoryInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const github_repository = /** @type {((inputs?: Github_RepositoryInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Github_RepositoryInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.github_repository(inputs)
	return __zh.github_repository(inputs)
});
/**
* | output |
* | --- |
* | "A Cloudflare-native publishing system with visual writing, Markdown import, bilingual content, and API automation workflows." |
*
* @param {Home_Bilingual_Intro_EnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const home_bilingual_intro_en = /** @type {((inputs?: Home_Bilingual_Intro_EnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Bilingual_Intro_EnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.home_bilingual_intro_en(inputs)
	return __zh.home_bilingual_intro_en(inputs)
});
/**
* | output |
* | --- |
* | "基于 Cloudflare 的个人发布系统——支持可视化写作、Markdown 导入、中英文内容和 API 自动化工作流。" |
*
* @param {Home_Bilingual_Intro_ZhInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const home_bilingual_intro_zh = /** @type {((inputs?: Home_Bilingual_Intro_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Bilingual_Intro_ZhInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.home_bilingual_intro_zh(inputs)
	return __zh.home_bilingual_intro_zh(inputs)
});
/**
* | output |
* | --- |
* | "Cloudflare-native · Personal Blog" |
*
* @param {Home_EyebrowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const home_eyebrow = /** @type {((inputs?: Home_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.home_eyebrow(inputs)
	return __zh.home_eyebrow(inputs)
});
/**
* | output |
* | --- |
* | "Publishing stack notes" |
*
* @param {Home_Featured_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const home_featured_title = /** @type {((inputs?: Home_Featured_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Featured_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.home_featured_title(inputs)
	return __zh.home_featured_title(inputs)
});
/**
* | output |
* | --- |
* | "Browse by publishing workflow, Cloudflare infrastructure, and AI automation." |
*
* @param {Home_Tags_DescriptionInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const home_tags_description = /** @type {((inputs?: Home_Tags_DescriptionInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Home_Tags_DescriptionInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.home_tags_description(inputs)
	return __zh.home_tags_description(inputs)
});
/**
* | output |
* | --- |
* | "Language" |
*
* @param {LanguageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language = /** @type {((inputs?: LanguageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<LanguageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language(inputs)
	return __zh.language(inputs)
});
/**
* | output |
* | --- |
* | "English" |
*
* @param {Language_EnglishInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_english = /** @type {((inputs?: Language_EnglishInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_EnglishInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language_english(inputs)
	return __zh.language_english(inputs)
});
/**
* | output |
* | --- |
* | "Switch to English" |
*
* @param {Language_Switch_To_EnInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_switch_to_en = /** @type {((inputs?: Language_Switch_To_EnInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_Switch_To_EnInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language_switch_to_en(inputs)
	return __zh.language_switch_to_en(inputs)
});
/**
* | output |
* | --- |
* | "切换到中文" |
*
* @param {Language_Switch_To_ZhInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_switch_to_zh = /** @type {((inputs?: Language_Switch_To_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_Switch_To_ZhInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language_switch_to_zh(inputs)
	return __zh.language_switch_to_zh(inputs)
});
/**
* | output |
* | --- |
* | "中文" |
*
* @param {Language_ZhInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const language_zh = /** @type {((inputs?: Language_ZhInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_ZhInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.language_zh(inputs)
	return __zh.language_zh(inputs)
});
/**
* | output |
* | --- |
* | "Latest posts" |
*
* @param {Latest_PostsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const latest_posts = /** @type {((inputs?: Latest_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Latest_PostsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.latest_posts(inputs)
	return __zh.latest_posts(inputs)
});
/**
* | output |
* | --- |
* | "Developer" |
*
* @param {Layout_Preset_DeveloperInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const layout_preset_developer = /** @type {((inputs?: Layout_Preset_DeveloperInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Layout_Preset_DeveloperInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.layout_preset_developer(inputs)
	return __zh.layout_preset_developer(inputs)
});
/**
* | output |
* | --- |
* | "Journal" |
*
* @param {Layout_Preset_JournalInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const layout_preset_journal = /** @type {((inputs?: Layout_Preset_JournalInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Layout_Preset_JournalInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.layout_preset_journal(inputs)
	return __zh.layout_preset_journal(inputs)
});
/**
* | output |
* | --- |
* | "Shelf" |
*
* @param {Layout_Preset_ShelfInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const layout_preset_shelf = /** @type {((inputs?: Layout_Preset_ShelfInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Layout_Preset_ShelfInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.layout_preset_shelf(inputs)
	return __zh.layout_preset_shelf(inputs)
});
/**
* | output |
* | --- |
* | "Login" |
*
* @param {LoginInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login = /** @type {((inputs?: LoginInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<LoginInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login(inputs)
	return __zh.login(inputs)
});
/**
* | output |
* | --- |
* | "Or" |
*
* @param {Login_AlternativeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_alternative = /** @type {((inputs?: Login_AlternativeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_AlternativeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_alternative(inputs)
	return __zh.login_alternative(inputs)
});
/**
* | output |
* | --- |
* | "Email" |
*
* @param {Login_EmailInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_email = /** @type {((inputs?: Login_EmailInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_EmailInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_email(inputs)
	return __zh.login_email(inputs)
});
/**
* | output |
* | --- |
* | "hello@example.com" |
*
* @param {Login_Email_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_email_placeholder = /** @type {((inputs?: Login_Email_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_Email_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_email_placeholder(inputs)
	return __zh.login_email_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "An error occurred while signing in." |
*
* @param {Login_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_error = /** @type {((inputs?: Login_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_error(inputs)
	return __zh.login_error(inputs)
});
/**
* | output |
* | --- |
* | "Welcome back to {name}" |
*
* @param {Login_GreetingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_greeting = /** @type {((inputs: Login_GreetingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_GreetingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_greeting(inputs)
	return __zh.login_greeting(inputs)
});
/**
* | output |
* | --- |
* | "Don't have an account?" |
*
* @param {Login_No_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_no_account = /** @type {((inputs?: Login_No_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_No_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_no_account(inputs)
	return __zh.login_no_account(inputs)
});
/**
* | output |
* | --- |
* | "Password" |
*
* @param {Login_PasswordInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_password = /** @type {((inputs?: Login_PasswordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_PasswordInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_password(inputs)
	return __zh.login_password(inputs)
});
/**
* | output |
* | --- |
* | "Enter password here" |
*
* @param {Login_Password_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_password_placeholder = /** @type {((inputs?: Login_Password_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_Password_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_password_placeholder(inputs)
	return __zh.login_password_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Logging in..." |
*
* @param {Login_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_pending = /** @type {((inputs?: Login_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_pending(inputs)
	return __zh.login_pending(inputs)
});
/**
* | output |
* | --- |
* | "An error occurred during {provider} sign-in." |
*
* @param {Login_Social_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_social_error = /** @type {((inputs: Login_Social_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_Social_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_social_error(inputs)
	return __zh.login_social_error(inputs)
});
/**
* | output |
* | --- |
* | "Connecting to {provider}..." |
*
* @param {Login_Social_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_social_pending = /** @type {((inputs: Login_Social_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_Social_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_social_pending(inputs)
	return __zh.login_social_pending(inputs)
});
/**
* | output |
* | --- |
* | "Login with {provider}" |
*
* @param {Login_With_ProviderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const login_with_provider = /** @type {((inputs: Login_With_ProviderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Login_With_ProviderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.login_with_provider(inputs)
	return __zh.login_with_provider(inputs)
});
/**
* | output |
* | --- |
* | "Update password" |
*
* @param {Password_Reset_ConfirmInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_confirm = /** @type {((inputs?: Password_Reset_ConfirmInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_ConfirmInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_confirm(inputs)
	return __zh.password_reset_confirm(inputs)
});
/**
* | output |
* | --- |
* | "Password could not be updated." |
*
* @param {Password_Reset_Confirm_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_confirm_error = /** @type {((inputs?: Password_Reset_Confirm_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_Confirm_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_confirm_error(inputs)
	return __zh.password_reset_confirm_error(inputs)
});
/**
* | output |
* | --- |
* | "Updating..." |
*
* @param {Password_Reset_Confirm_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_confirm_pending = /** @type {((inputs?: Password_Reset_Confirm_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_Confirm_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_confirm_pending(inputs)
	return __zh.password_reset_confirm_pending(inputs)
});
/**
* | output |
* | --- |
* | "Password updated." |
*
* @param {Password_Reset_Confirm_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_confirm_success = /** @type {((inputs?: Password_Reset_Confirm_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_Confirm_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_confirm_success(inputs)
	return __zh.password_reset_confirm_success(inputs)
});
/**
* | output |
* | --- |
* | "Forgot password?" |
*
* @param {Password_Reset_LinkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_link = /** @type {((inputs?: Password_Reset_LinkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_LinkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_link(inputs)
	return __zh.password_reset_link(inputs)
});
/**
* | output |
* | --- |
* | "New password" |
*
* @param {Password_Reset_New_PasswordInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_new_password = /** @type {((inputs?: Password_Reset_New_PasswordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_New_PasswordInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_new_password(inputs)
	return __zh.password_reset_new_password(inputs)
});
/**
* | output |
* | --- |
* | "Send reset link" |
*
* @param {Password_Reset_RequestInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_request = /** @type {((inputs?: Password_Reset_RequestInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_RequestInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_request(inputs)
	return __zh.password_reset_request(inputs)
});
/**
* | output |
* | --- |
* | "Password reset email could not be sent." |
*
* @param {Password_Reset_Request_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_request_error = /** @type {((inputs?: Password_Reset_Request_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_Request_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_request_error(inputs)
	return __zh.password_reset_request_error(inputs)
});
/**
* | output |
* | --- |
* | "Sending..." |
*
* @param {Password_Reset_Request_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_request_pending = /** @type {((inputs?: Password_Reset_Request_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_Request_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_request_pending(inputs)
	return __zh.password_reset_request_pending(inputs)
});
/**
* | output |
* | --- |
* | "If the account exists and email is enabled, a reset link has been sent." |
*
* @param {Password_Reset_Request_SuccessInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_request_success = /** @type {((inputs?: Password_Reset_Request_SuccessInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_Request_SuccessInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_request_success(inputs)
	return __zh.password_reset_request_success(inputs)
});
/**
* | output |
* | --- |
* | "Reset password" |
*
* @param {Password_Reset_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const password_reset_title = /** @type {((inputs?: Password_Reset_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Password_Reset_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.password_reset_title(inputs)
	return __zh.password_reset_title(inputs)
});
/**
* | output |
* | --- |
* | "About" |
*
* @param {Nav_AboutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const nav_about = /** @type {((inputs?: Nav_AboutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_AboutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_about(inputs)
	return __zh.nav_about(inputs)
});
/**
* | output |
* | --- |
* | "Blog" |
*
* @param {Nav_BlogInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const nav_blog = /** @type {((inputs?: Nav_BlogInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_BlogInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_blog(inputs)
	return __zh.nav_blog(inputs)
});
/**
* | output |
* | --- |
* | "Docs" |
*
* @param {Nav_DocsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const nav_docs = /** @type {((inputs?: Nav_DocsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_DocsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_docs(inputs)
	return __zh.nav_docs(inputs)
});
/**
* | output |
* | --- |
* | "Series" |
*
* @param {Nav_SeriesInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const nav_series = /** @type {((inputs?: Nav_SeriesInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SeriesInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_series(inputs)
	return __zh.nav_series(inputs)
});
/**
* | output |
* | --- |
* | "Tags" |
*
* @param {Nav_TagsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const nav_tags = /** @type {((inputs?: Nav_TagsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_TagsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_tags(inputs)
	return __zh.nav_tags(inputs)
});
/**
* | output |
* | --- |
* | "Open admin" |
*
* @param {Open_AdminInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const open_admin = /** @type {((inputs?: Open_AdminInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Open_AdminInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.open_admin(inputs)
	return __zh.open_admin(inputs)
});
/**
* | output |
* | --- |
* | "Pinned" |
*
* @param {PinnedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const pinned = /** @type {((inputs?: PinnedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<PinnedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.pinned(inputs)
	return __zh.pinned(inputs)
});
/**
* | output |
* | --- |
* | "Next" |
*
* @param {Pagination_NextInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const pagination_next = /** @type {((inputs?: Pagination_NextInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pagination_NextInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.pagination_next(inputs)
	return __zh.pagination_next(inputs)
});
/**
* | output |
* | --- |
* | "Page {current} of {total}" |
*
* @param {Pagination_PageInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const pagination_page = /** @type {((inputs: Pagination_PageInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pagination_PageInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.pagination_page(inputs)
	return __zh.pagination_page(inputs)
});
/**
* | output |
* | --- |
* | "Previous" |
*
* @param {Pagination_PreviousInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const pagination_previous = /** @type {((inputs?: Pagination_PreviousInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pagination_PreviousInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.pagination_previous(inputs)
	return __zh.pagination_previous(inputs)
});
/**
* | output |
* | --- |
* | "{count} posts" |
*
* @param {Posts_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const posts_count = /** @type {((inputs: Posts_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Posts_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.posts_count(inputs)
	return __zh.posts_count(inputs)
});
/**
* | output |
* | --- |
* | "{count} published" |
*
* @param {Published_CountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const published_count = /** @type {((inputs: Published_CountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Published_CountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.published_count(inputs)
	return __zh.published_count(inputs)
});
/**
* | output |
* | --- |
* | "Read latest posts" |
*
* @param {Read_Latest_PostsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const read_latest_posts = /** @type {((inputs?: Read_Latest_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Read_Latest_PostsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.read_latest_posts(inputs)
	return __zh.read_latest_posts(inputs)
});
/**
* | output |
* | --- |
* | "Related" |
*
* @param {RelatedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const related = /** @type {((inputs?: RelatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<RelatedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.related(inputs)
	return __zh.related(inputs)
});
/**
* | output |
* | --- |
* | "RSS feed" |
*
* @param {Rss_FeedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const rss_feed = /** @type {((inputs?: Rss_FeedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Rss_FeedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.rss_feed(inputs)
	return __zh.rss_feed(inputs)
});
/**
* | output |
* | --- |
* | "Series" |
*
* @param {Series_EyebrowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const series_eyebrow = /** @type {((inputs?: Series_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Series_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.series_eyebrow(inputs)
	return __zh.series_eyebrow(inputs)
});
/**
* | output |
* | --- |
* | "Series" |
*
* @param {Series_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const series_title = /** @type {((inputs?: Series_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Series_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.series_title(inputs)
	return __zh.series_title(inputs)
});
/**
* | output |
* | --- |
* | "01MVP Blog Template" |
*
* @param {Site_SubtitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const site_subtitle = /** @type {((inputs?: Site_SubtitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Site_SubtitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.site_subtitle(inputs)
	return __zh.site_subtitle(inputs)
});
/**
* | output |
* | --- |
* | "Sign up" |
*
* @param {SignupInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup = /** @type {((inputs?: SignupInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<SignupInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup(inputs)
	return __zh.signup(inputs)
});
/**
* | output |
* | --- |
* | "Confirm Password" |
*
* @param {Signup_Confirm_PasswordInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_confirm_password = /** @type {((inputs?: Signup_Confirm_PasswordInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Confirm_PasswordInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_confirm_password(inputs)
	return __zh.signup_confirm_password(inputs)
});
/**
* | output |
* | --- |
* | "Confirm password" |
*
* @param {Signup_Confirm_Password_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_confirm_password_placeholder = /** @type {((inputs?: Signup_Confirm_Password_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Confirm_Password_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_confirm_password_placeholder(inputs)
	return __zh.signup_confirm_password_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "An error occurred while signing up." |
*
* @param {Signup_ErrorInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_error = /** @type {((inputs?: Signup_ErrorInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_ErrorInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_error(inputs)
	return __zh.signup_error(inputs)
});
/**
* | output |
* | --- |
* | "Create your {name} account" |
*
* @param {Signup_GreetingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_greeting = /** @type {((inputs: Signup_GreetingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_GreetingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_greeting(inputs)
	return __zh.signup_greeting(inputs)
});
/**
* | output |
* | --- |
* | "Already have an account?" |
*
* @param {Signup_Has_AccountInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_has_account = /** @type {((inputs?: Signup_Has_AccountInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Has_AccountInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_has_account(inputs)
	return __zh.signup_has_account(inputs)
});
/**
* | output |
* | --- |
* | "Username" |
*
* @param {Signup_NameInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_name = /** @type {((inputs?: Signup_NameInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_NameInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_name(inputs)
	return __zh.signup_name(inputs)
});
/**
* | output |
* | --- |
* | "your name" |
*
* @param {Signup_Name_PlaceholderInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_name_placeholder = /** @type {((inputs?: Signup_Name_PlaceholderInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Name_PlaceholderInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_name_placeholder(inputs)
	return __zh.signup_name_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Username is required." |
*
* @param {Signup_Name_RequiredInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_name_required = /** @type {((inputs?: Signup_Name_RequiredInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Name_RequiredInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_name_required(inputs)
	return __zh.signup_name_required(inputs)
});
/**
* | output |
* | --- |
* | "Hide password" |
*
* @param {Signup_Password_HideInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_password_hide = /** @type {((inputs?: Signup_Password_HideInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Password_HideInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_password_hide(inputs)
	return __zh.signup_password_hide(inputs)
});
/**
* | output |
* | --- |
* | "Passwords do not match." |
*
* @param {Signup_Password_MismatchInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_password_mismatch = /** @type {((inputs?: Signup_Password_MismatchInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Password_MismatchInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_password_mismatch(inputs)
	return __zh.signup_password_mismatch(inputs)
});
/**
* | output |
* | --- |
* | "Show password" |
*
* @param {Signup_Password_ShowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_password_show = /** @type {((inputs?: Signup_Password_ShowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_Password_ShowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_password_show(inputs)
	return __zh.signup_password_show(inputs)
});
/**
* | output |
* | --- |
* | "Signing up..." |
*
* @param {Signup_PendingInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const signup_pending = /** @type {((inputs?: Signup_PendingInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Signup_PendingInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.signup_pending(inputs)
	return __zh.signup_pending(inputs)
});
/**
* | output |
* | --- |
* | "Sign out" |
*
* @param {Sign_OutInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const sign_out = /** @type {((inputs?: Sign_OutInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sign_OutInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.sign_out(inputs)
	return __zh.sign_out(inputs)
});
/**
* | output |
* | --- |
* | "Submit comment" |
*
* @param {Submit_CommentInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const submit_comment = /** @type {((inputs?: Submit_CommentInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Submit_CommentInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.submit_comment(inputs)
	return __zh.submit_comment(inputs)
});
/**
* | output |
* | --- |
* | "Tag" |
*
* @param {Tag_EyebrowInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const tag_eyebrow = /** @type {((inputs?: Tag_EyebrowInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tag_EyebrowInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.tag_eyebrow(inputs)
	return __zh.tag_eyebrow(inputs)
});
/**
* | output |
* | --- |
* | "Tags" |
*
* @param {Tags_TitleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const tags_title = /** @type {((inputs?: Tags_TitleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Tags_TitleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.tags_title(inputs)
	return __zh.tags_title(inputs)
});
/**
* | output |
* | --- |
* | "Dark" |
*
* @param {Theme_DarkInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_dark = /** @type {((inputs?: Theme_DarkInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_DarkInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_dark(inputs)
	return __zh.theme_dark(inputs)
});
/**
* | output |
* | --- |
* | "Light" |
*
* @param {Theme_LightInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_light = /** @type {((inputs?: Theme_LightInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_LightInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_light(inputs)
	return __zh.theme_light(inputs)
});
/**
* | output |
* | --- |
* | "Apple Rounded" |
*
* @param {Theme_Preset_AppleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_preset_apple = /** @type {((inputs?: Theme_Preset_AppleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_Preset_AppleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_preset_apple(inputs)
	return __zh.theme_preset_apple(inputs)
});
/**
* | output |
* | --- |
* | "Warm Editorial" |
*
* @param {Theme_Preset_ClaudeInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_preset_claude = /** @type {((inputs?: Theme_Preset_ClaudeInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_Preset_ClaudeInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_preset_claude(inputs)
	return __zh.theme_preset_claude(inputs)
});
/**
* | output |
* | --- |
* | "Warm Editorial" |
*
* @param {Theme_Preset_EditorialInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_preset_editorial = /** @type {((inputs?: Theme_Preset_EditorialInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_Preset_EditorialInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_preset_editorial(inputs)
	return __zh.theme_preset_editorial(inputs)
});
/**
* | output |
* | --- |
* | "Brutalist" |
*
* @param {Theme_Preset_BrutalistInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_preset_brutalist = /** @type {((inputs?: Theme_Preset_BrutalistInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_Preset_BrutalistInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_preset_brutalist(inputs)
	return __zh.theme_preset_brutalist(inputs)
});
/**
* | output |
* | --- |
* | "Monochrome" |
*
* @param {Theme_Preset_MakerInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_preset_maker = /** @type {((inputs?: Theme_Preset_MakerInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_Preset_MakerInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_preset_maker(inputs)
	return __zh.theme_preset_maker(inputs)
});
/**
* | output |
* | --- |
* | "System" |
*
* @param {Theme_SystemInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_system = /** @type {((inputs?: Theme_SystemInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_SystemInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_system(inputs)
	return __zh.theme_system(inputs)
});
/**
* | output |
* | --- |
* | "Toggle theme" |
*
* @param {Theme_ToggleInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const theme_toggle = /** @type {((inputs?: Theme_ToggleInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Theme_ToggleInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.theme_toggle(inputs)
	return __zh.theme_toggle(inputs)
});
/**
* | output |
* | --- |
* | "Updated" |
*
* @param {UpdatedInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const updated = /** @type {((inputs?: UpdatedInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<UpdatedInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.updated(inputs)
	return __zh.updated(inputs)
});
/**
* | output |
* | --- |
* | "Upload" |
*
* @param {UploadInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const upload = /** @type {((inputs?: UploadInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<UploadInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.upload(inputs)
	return __zh.upload(inputs)
});
/**
* | output |
* | --- |
* | "View all posts" |
*
* @param {View_All_PostsInputs} inputs
* @param {{ locale?: "en" | "zh" }} options
* @returns {LocalizedString}
*/
export const view_all_posts = /** @type {((inputs?: View_All_PostsInputs, options?: { locale?: "en" | "zh" }) => LocalizedString) & import('../runtime.js').MessageMetadata<View_All_PostsInputs, { locale?: "en" | "zh" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.view_all_posts(inputs)
	return __zh.view_all_posts(inputs)
});