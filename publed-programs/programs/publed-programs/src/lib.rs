use anchor_lang::prelude::*;
use anchor_lang::solana_program::entrypoint::ProgramResult;

declare_id!("E2JpF1p5zAzVYxyEkHkD4tVNMYftueEQB782kBBZCB4Y");

#[program]
pub mod publed_programs {

    use super::*;

    pub fn init_publed(ctx: Context<InitPubled>) -> ProgramResult {
        let publed_account = &mut ctx.accounts.publed_account;
        let genesis_post_account = &mut ctx.accounts.genesis_post_account;
        let authority = &mut ctx.accounts.authority;

        publed_account.authority = authority.key();
        publed_account.current_post_key = genesis_post_account.key();

        Ok(())
    }

    pub fn signup_user(
        ctx: Context<SignupUser>,
        name: String,
        avatar: String,
        orcid: String,
    ) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        user_account.name = name;
        user_account.avatar = avatar;
        user_account.orcid = orcid;
        user_account.authority = authority.key();

        Ok(())
    }

    pub fn update_user(ctx: Context<UpdateUser>, name: String, avatar: String) -> ProgramResult {
        let user_account = &mut ctx.accounts.user_account;

        user_account.name = name;
        user_account.avatar = avatar;

        Ok(())
    }

    pub fn create_post(ctx: Context<CreatePost>, title: String, content: String) -> ProgramResult {
        let publed_account = &mut ctx.accounts.publed_account;
        let post_account = &mut ctx.accounts.post_account;
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        post_account.title = title;
        post_account.content = content;
        post_account.user = user_account.key();
        post_account.authority = authority.key();
        post_account.pre_post_key = publed_account.current_post_key;

        publed_account.current_post_key = post_account.key();

        emit!(PostEvent {
            label: "CREATE".to_string(),
            post_id: post_account.key(),
            next_post_id: None
        });

        Ok(())
    }

    pub fn update_post(ctx: Context<UpdatePost>, title: String, content: String) -> ProgramResult {
        let post_account = &mut ctx.accounts.post_account;

        post_account.title = title;
        post_account.content = content;

        emit!(PostEvent {
            label: "UPDATE".to_string(),
            post_id: post_account.key(),
            next_post_id: None
        });

        Ok(())
    }

    pub fn delete_post(ctx: Context<DeletePost>) -> ProgramResult {
        let post_account = &mut ctx.accounts.post_account;
        let next_post_account = &mut ctx.accounts.next_post_account;

        next_post_account.pre_post_key = post_account.pre_post_key;

        emit!(PostEvent {
            label: "DELETE".to_string(),
            post_id: post_account.key(),
            next_post_id: Some(next_post_account.key())
        });

        Ok(())
    }

    pub fn delete_latest_post(ctx: Context<DeleteLatestPost>) -> ProgramResult {
        let post_account = &mut ctx.accounts.post_account;
        let publed_account = &mut ctx.accounts.publed_account;

        publed_account.current_post_key = post_account.pre_post_key;

        emit!(PostEvent {
            label: "DELETE".to_string(),
            post_id: post_account.key(),
            next_post_id: None
        });

        Ok(())
    }

    pub fn create_review(
        ctx: Context<CreateReview>,
        strenghts: String,
        weaknesses: String,
        obs: String,
    ) -> ProgramResult {
        let review_account = &mut ctx.accounts.review_account;
        let post_account = &mut ctx.accounts.post_account;
        let user_account = &mut ctx.accounts.user_account;
        let authority = &mut ctx.accounts.authority;

        review_account.strenghts = strenghts;
        review_account.weaknesses = weaknesses;
        review_account.obs = obs;
        review_account.user = user_account.key();
        review_account.post = post_account.key();
        review_account.authority = authority.key();

        emit!(PostEvent {
            label: "CREATE".to_string(),
            post_id: post_account.key(),
            next_post_id: None
        });

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitPubled<'info> {
    #[account(init, payer = authority, space = 8 + 32 + 32 + 32 + 32)]
    pub publed_account: Account<'info, PubledState>,
    #[account(init, payer = authority, space = 8 + 32 + 32 + 32 + 32 + 8)]
    pub genesis_post_account: Account<'info, PostState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreatePost<'info> {
    #[account(init, payer = authority, space = 8 + 50 + 500 + 32 + 32 + 32 + 32 + 32 + 32)]
    pub post_account: Account<'info, PostState>,
    #[account(mut, has_one = authority)]
    pub user_account: Account<'info, UserState>,
    #[account(mut)]
    pub publed_account: Account<'info, PubledState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePost<'info> {
    #[account(
        mut,
        has_one = authority,
    )]
    pub post_account: Account<'info, PostState>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeletePost<'info> {
    #[account(
        mut,
        has_one = authority,
        close = authority,
        constraint = post_account.key() == next_post_account.pre_post_key
    )]
    pub post_account: Account<'info, PostState>,
    #[account(mut)]
    pub next_post_account: Account<'info, PostState>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct DeleteLatestPost<'info> {
    #[account(
        mut,
        has_one = authority,
        close = authority
    )]
    pub post_account: Account<'info, PostState>,
    #[account(mut)]
    pub publed_account: Account<'info, PubledState>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct SignupUser<'info> {
    #[account(init, payer = authority, space = 8 + 40 + 120  + 32)]
    pub user_account: Account<'info, UserState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdateUser<'info> {
    #[account(
        mut,
        has_one = authority,
    )]
    pub user_account: Account<'info, UserState>,
    pub authority: Signer<'info>,
}

#[derive(Accounts)]
pub struct CreateReview<'info> {
    #[account(init, payer = authority, space = 8 + 50 + 500 + 32 + 32 + 32 + 32 + 32 + 32)]
    pub review_account: Account<'info, ReviewState>,
    #[account(mut)]
    pub post_account: Account<'info, PostState>,
    #[account(mut, has_one = authority)]
    pub user_account: Account<'info, UserState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[event]
pub struct PostEvent {
    pub label: String,
    pub post_id: Pubkey,
    pub next_post_id: Option<Pubkey>,
}

#[account]
pub struct PubledState {
    pub current_post_key: Pubkey,
    pub authority: Pubkey,
}

#[account]
pub struct UserState {
    pub name: String,
    pub avatar: String,
    pub authority: Pubkey,
    pub orcid: String,
}

#[account]
pub struct PostState {
    title: String,
    content: String,
    user: Pubkey,
    pub pre_post_key: Pubkey,
    pub authority: Pubkey,
}

#[account]
pub struct ReviewState {
    strenghts: String,
    weaknesses: String,
    obs: String,
    user: Pubkey,
    post: Pubkey,
    pub authority: Pubkey,
}
