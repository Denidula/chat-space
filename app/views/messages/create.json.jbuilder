json.content @message.content
json.date @message.created_at.strftime("%Y/%m/%d %H:%M")
json.user_name @message.user.name
json.user_id @message.user.id
json.image   @message.image.url