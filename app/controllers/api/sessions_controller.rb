class Api::SessionsController < ApplicationController
    def show
        if current_user
            @user = current_user
            render 'api/users/show'
        else
            render json: { user: nil }
        end
    end

    def create
        @user = User.find_by_credentials(params[:email], params[:password])
        if @user
            login!(@user)
            render 'api/users/show'
        else  
            render json: { errors: ['Incorrect email or password'] }, status: :unauthorized
        end
    end

    def destroy
        logout! if current_user
        render json: { message: 'success' }
    end
end
