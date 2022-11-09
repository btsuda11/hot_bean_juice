@reviews.each do |review|
    json.set! review.id do
        json.extract! review, :reviewer_name, :id, :title, :body, :rating, :product_id, :reviewer_id
        json.createdAt review.created_at.to_date.strftime '%m/%d/%y'
    end
end