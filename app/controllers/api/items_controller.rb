class Api::ItemsController < ApplicationController
  before_action :find_pr, only: [:index, :create]
  def index
    render json: @pr.items.map(&Item.data)
  end

  def create
    item = @pr.items.build(content: params[:content])
    if item.save
      render json: @pr.items.map(&Item.data)
    else
      render json: {message: @pr.errors.full_messages}, status: 400
    end
  end

  def toggle
    item = Item.find params[:item_id]
    item.update_attribute :finished, !item.finished
    render json: {}
  end

  private
  def find_pr
    @pr = Project.find params[:project_id]
  end
end
