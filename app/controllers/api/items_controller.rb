class Api::ItemsController < ApplicationController
  def index
    pr = Project.find params[:project_id]
    render json: pr.items
  end
end
